import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { SessionFailedModule } from './session_failed/session_failed.module';
import { DirectorateModule } from './directorate/directorate.module';
import { SectorModule } from './sector/sector.module';
import { DirectorateHasSectorModule } from './directorate_has_sector/directorate_has_sector.module';
import { PositionModule } from './position/position.module';
import { VisitorModule } from './visitor/visitor.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GovernmentInstitutionsModule } from './government_institutions/government_institutions.module';
import { InstitutionalDepartmentsModule } from './institutional_departments/institutional_departments.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        EmployeeModule,
        CommonModule,
        UserModule,
        SessionFailedModule,
        DirectorateModule,
        SectorModule,
        DirectorateHasSectorModule,
        PositionModule,
        VisitorModule,
        AuthModule,
        GovernmentInstitutionsModule,
        InstitutionalDepartmentsModule
    ],
})
export class AppModule {}
