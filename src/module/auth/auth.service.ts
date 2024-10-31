import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { SigninDTO } from "./dto/signin.dto";
import { SignupDTO } from "./dto/signup.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { EmailService } from "../email/email.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) { }


    async signup(payload: SignupDTO): Promise<string> {
        const { email, password } = payload;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) throw new HttpException("email already registered", HttpStatus.BAD_REQUEST);
        const encryptPassword = await bcrypt.hash(password, 12);
        const newUser = this.userRepository.create({ ...payload, password: encryptPassword });
        await this.userRepository.save(newUser);
        return "created successfully!";
    }


    async signin(payload: SigninDTO): Promise<string> {
        const { email, password } = payload;
        const existingUser = await this.userRepository.findOne({ where: { email: email } });
        if (!existingUser) throw new HttpException("email not registered", HttpStatus.NOT_FOUND);
        if (existingUser.provider_type !== "local" && existingUser.password === null) throw new HttpException("user registered with other services (google)", HttpStatus.BAD_REQUEST);
        const decryptPassword = await bcrypt.compare(password, existingUser.password);
        if (!decryptPassword) throw new HttpException("invalid password", HttpStatus.BAD_REQUEST);
        const token = this.jwtService.sign({ id: existingUser.id });
        await this.emailService.sendWelcomeEmail(email, existingUser.first_name);
        return token;
    }



    async validateUserById(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId }, select: ["id", "first_name", "last_name", "email", "phone_number"] });
        if (!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        return user;
    }


    async googleAuth(req: any): Promise<string> {
        const { email, firstName, lastName, provider_id, image_url, provider_type } = req.user;
        const existingUser = await this.userRepository.findOne({ where: { email } });

        // Signin
        if (existingUser) {
            const token = this.jwtService.sign({ id: existingUser.id });
            await this.emailService.sendWelcomeEmail(email, existingUser.first_name);
            return token;
        }

        // Signup
        const newUser = this.userRepository.create({ email, first_name: firstName, last_name: lastName, provider_id, image_url, provider_type });
        const savedUser = await this.userRepository.save(newUser);
        const token = this.jwtService.sign({ id: savedUser.id });
        return token;
    }
}