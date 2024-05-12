import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
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

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        EmployeeModule,
        CommonModule,
        SeedModule,
        UserModule,
        SessionFailedModule,
        DirectorateModule,
        SectorModule,
        DirectorateHasSectorModule,
        PositionModule,
        VisitorModule,
        AuthModule
    ],
})
export class AppModule {}
