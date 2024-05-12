import { Module } from '@nestjs/common';
import { DirectorateService } from './directorate.service';
import { DirectorateController } from './directorate.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [DirectorateController],
    providers: [DirectorateService],
    exports: [DirectorateService]
})
export class DirectorateModule {}
