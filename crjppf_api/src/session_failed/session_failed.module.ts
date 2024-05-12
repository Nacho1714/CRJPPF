import { Module } from '@nestjs/common';
import { SessionFailedService } from './session_failed.service';
import { SessionFailedController } from './session_failed.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [SessionFailedController],
    providers: [SessionFailedService],
    exports: [SessionFailedService]
})
export class SessionFailedModule {}
