import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PUBLIC_KEY } from "src/common/decorators/public.access";



export class CustomJwtGuard extends AuthGuard("jwt") {
    constructor(private readonly reflector: Reflector) {
        super();
    }



    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 1.  By Pass Jwt Auth Guard
        const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
        if (isPublic) return true;
        return super.canActivate(context);
    }



    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        // check 1 : handle token expiration
        if (info && info.name === 'TokenExpiredError') throw new HttpException('Token has expired. Please log in again.', HttpStatus.UNAUTHORIZED);
        // check 2 :  Malformed token or token signature error
        if (info && info.name === 'JsonWebTokenError') throw new HttpException('Invalid token. Please log in again.', HttpStatus.UNAUTHORIZED);
        // check 3 : handle token verfication failed
        if (err || !user) throw err || new HttpException('Unauthorized access. Token verification failed , Maybe the token is missing', HttpStatus.UNAUTHORIZED);
        return user;
    }
}