import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user as User } from '@prisma/client';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {
    private readonly logger = new Logger('UserRoleGuard')

    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(
        ctx: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const validRoles = this.reflector.get(META_ROLES, ctx.getHandler());

        if (!validRoles || validRoles.length === 0) return true;

        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User;

        if (!user) {
            this.logger.error('User not found in request object')
            throw new InternalServerErrorException('User not found');
        }

        // TODO: descomentar si se implementa el campo roles en la tabla user
        // for (const role of user.roles) {
        //     if (validRoles.includes(role)) return true;
        // }

        this.logger.error('User does not have permission to access this route')
        throw new ForbiddenException(`User ${user.profile} does not have permission to access this route`);
    }
}
