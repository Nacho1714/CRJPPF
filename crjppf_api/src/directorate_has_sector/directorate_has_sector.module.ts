import { Module } from '@nestjs/common';
import { DirectorateHasSectorService } from './directorate_has_sector.service';
import { DirectorateHasSectorController } from './directorate_has_sector.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DirectorateModule } from '../directorate/directorate.module';
import { SectorModule } from '../sector/sector.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, DirectorateModule, SectorModule, AuthModule],
    controllers: [DirectorateHasSectorController],
    providers: [DirectorateHasSectorService],
    exports: [DirectorateHasSectorService]
})
export class DirectorateHasSectorModule {}
