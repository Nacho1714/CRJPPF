import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DirectorateModule } from '../directorate/directorate.module';
import { EmployeeModule } from '../employee/employee.module';
import { PositionModule } from '../position/position.module';
import { SectorModule } from '../sector/sector.module';
import { UserModule } from '../user/user.module';
import { DirectorateHasSectorModule } from '../directorate_has_sector/directorate_has_sector.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        PrismaModule, 
        DirectorateModule,
        SectorModule,
        DirectorateHasSectorModule,
        EmployeeModule,
        PositionModule,
        UserModule,
        AuthModule
    ],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {}
