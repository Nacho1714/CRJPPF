import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, TokenUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserWithToken } from './entities/user-token.entity';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Iniciar sesión
     */
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<UserWithToken> {
        return this.authService.login(loginUserDto);
    }
    
    /**
     * Decodificar token
     */
    @Get('decode-token')
    @Auth()
    decodeToken(@Headers() headers: IncomingHttpHeaders): JwtPayload {
        // TODO: reviar porque no se esta documenta la respuesta
        const token = headers.authorization.split(' ')[1];
        return this.authService.decode(token);
    }
    
    /**
     * Verificar estado de autenticación
     */
    @Get('check-status')
    @Auth()
    checkAuthStatus(@GetUser() user: User): UserWithToken {
        return this.authService.checkAuthStatus(user);
    }
}
