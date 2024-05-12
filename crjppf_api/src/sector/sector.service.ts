import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSectorDto, UpdateSectorDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Sector } from './entities/sector.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class SectorService {
    private readonly logger = new Logger('SectorService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createSectorDto: CreateSectorDto): Promise<Sector> {
        try {
            const sector = await this.prisma.sector.create({data: createSectorDto});
            return sector; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Sector[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const sectors = await this.prisma.sector.findMany({
                take: limit,
                skip: offset
            });
            return sectors;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<Sector> {
        
        let sector: Sector;
        
        try {
            sector = await this.prisma.sector.findUnique({where: {sector_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }

        if (!sector) throw new NotFoundException(`El sector con id ${id} no existe`);

        return sector;
    }

    async update(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    
        await this.findOne(id);

        try {
            const updatedSector = await this.prisma.sector.update({
                where: {sector_id: id},
                data: updateSectorDto
            });
            return updatedSector;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
