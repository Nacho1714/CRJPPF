import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserWithToken } from './entities/user-token.entity';


@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}


    async login(loginUserDto: LoginUserDto): Promise<UserWithToken> {
        const {profile, password} = loginUserDto;

        let user;

        try {

            const [{user_login}]: [{user_login:number}] = await this.prisma.$queryRaw
            `
                SELECT user_login(${profile}, ${password})
            `;

            if (!user_login) throw new UnauthorizedException('Credentials are not valid')

            user = await this.prisma.user.findUnique({
                where: {user_id: user_login},
                select: {
                    user_id: true,
                    name: true,
                    last_name: true,
                    profile: true
                }
            })
            
        } catch (error) {
            if (error.status === 401) return error.response;
            
            this.prisma.handleDBExeption(error, this.logger);
        }

        user.token = this.getJwtToken({user_id: user.user_id});

        return user;
    }

    checkAuthStatus(user: User): UserWithToken{
        
        const responseUser = {
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            profile: user.profile
        };

        return {
            ...responseUser,
            token: this.getJwtToken({user_id: user.user_id})
        }
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    decode(token: string): JwtPayload {
        return this.jwtService.decode(token) as JwtPayload;
    }
}
