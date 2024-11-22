import { Module } from '@nestjs/common';
import { GovernmentInstitutionsService } from './government_institutions.service';
import { GovernmentInstitutionsController } from './government_institutions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [GovernmentInstitutionsController],
    providers: [GovernmentInstitutionsService],
    exports	: [GovernmentInstitutionsService],
})
export class GovernmentInstitutionsModule {}
