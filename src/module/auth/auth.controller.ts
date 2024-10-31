import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { SigninDTO } from "./dto/signin.dto";
import { PublicAccess } from "src/common/decorators/public.access";
import { AuthGuard } from "@nestjs/passport";
import { env } from "process";



@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @PublicAccess()
    @Post("signup")
    async signup(@Body() payload: SignupDTO): Promise<string> {
        return await this.authService.signup(payload);
    }



    @PublicAccess()
    @Post("signin")
    async signin(@Body() payload: SigninDTO): Promise<string> {
        return await this.authService.signin(payload);
    }



    // GOOGLE AUTH
    @Get('google')
    @PublicAccess()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }


    @Get('google/callback')
    @PublicAccess()
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const result = await this.authService.googleAuth(req);
        const redirectUrl = "https://piyushthaware.vercel.app";
        return res.redirect(redirectUrl);
    }
}