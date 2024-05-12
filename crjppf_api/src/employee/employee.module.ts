import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PositionModule } from '../position/position.module';
import { DirectorateHasSectorModule } from '../directorate_has_sector/directorate_has_sector.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, PositionModule, DirectorateHasSectorModule, AuthModule],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService]
})
export class EmployeeModule {}
