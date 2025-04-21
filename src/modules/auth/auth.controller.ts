import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/test')
    attemp(): string {
        return this.authService.attemp();
    }
}
