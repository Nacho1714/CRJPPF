import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDirectorateHasSectorDto, UpdateDirectorateHasSectorDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { DirectorateHasSector } from './entities/directorate_has_sector.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DirectorateService } from '../directorate/directorate.service';
import { SectorService } from '../sector/sector.service';

@Injectable()
export class DirectorateHasSectorService {
    private readonly logger = new Logger('DirectorateHasSectorService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly directorateService: DirectorateService,
        private readonly sectorService: SectorService
    ) {}

    async create(createDirectorateHasSectorDto: CreateDirectorateHasSectorDto): Promise<DirectorateHasSector> {
        try {
            const dhs = await this.prisma.directorate_has_sector.create({data: createDirectorateHasSectorDto}) as DirectorateHasSector;
            return dhs; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<DirectorateHasSector[]> {

        const {limit, offset} = paginationDto;

        try {
            const dhss = await this.prisma.directorate_has_sector.findMany({
                take: limit,
                skip: offset,
                orderBy: {name: 'asc'}
            }) as DirectorateHasSector[];
            return dhss;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<DirectorateHasSector> {

        let dhs: DirectorateHasSector;

        try {
            dhs = await this.prisma.directorate_has_sector.findUnique({where: {destination_id: id}}) as DirectorateHasSector;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
        
        if (!dhs) throw new NotFoundException(`El destino con id ${id} no existe`);

        return dhs;
    }

    async update(id: number, updateDirectorateHasSectorDto: UpdateDirectorateHasSectorDto): Promise<DirectorateHasSector> {
    
        await this.findOne(id);

        if(updateDirectorateHasSectorDto.directorate_fk)
            await this.directorateService.findOne(updateDirectorateHasSectorDto.directorate_fk);
        
        if(updateDirectorateHasSectorDto.sector_fk)
            await this.sectorService.findOne(updateDirectorateHasSectorDto.sector_fk);

        try {
            const updatedDhs = await this.prisma.directorate_has_sector.update({
                where: {destination_id: id},
                data: updateDirectorateHasSectorDto
            }) as DirectorateHasSector;
            return updatedDhs;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }
}
