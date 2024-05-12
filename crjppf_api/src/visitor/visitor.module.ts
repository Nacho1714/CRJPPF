import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { EmployeeModule } from '../employee/employee.module';
import { DirectorateHasSectorModule } from '../directorate_has_sector/directorate_has_sector.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, fileName } from './helpers';
import { diskStorage } from 'multer';

@Module({
    imports: [
        PrismaModule, 
        UserModule, 
        EmployeeModule, 
        DirectorateHasSectorModule,
        ConfigModule,
        AuthModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                fileFilter: fileFilter,
                storage: diskStorage({
                    // destination: configService.get('IMAGE_FOLDER_PATH'),
                    destination: './static/visitor',
                    filename: fileName
                })
            }),
        })
    ],
    controllers: [VisitorController],
    providers: [VisitorService],
    exports: [VisitorService]
})
export class VisitorModule {}
