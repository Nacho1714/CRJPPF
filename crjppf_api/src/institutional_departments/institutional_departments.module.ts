import { Module } from '@nestjs/common';
import { InstitutionalDepartmentsService } from './institutional_departments.service';
import { InstitutionalDepartmentsController } from './institutional_departments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [InstitutionalDepartmentsController],
    providers: [InstitutionalDepartmentsService],
    exports: [InstitutionalDepartmentsService],
})
export class InstitutionalDepartmentsModule {}
