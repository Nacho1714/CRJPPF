import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDirectorateDto, UpdateDirectorateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Directorate } from './entities/directorate.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class DirectorateService {
    private readonly logger = new Logger('DirectorateService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createDirectorateDto: CreateDirectorateDto): Promise<Directorate> {
        try {
            const directorate = await this.prisma.directorate.create({data: createDirectorateDto});
            return directorate; 
        } catch (error) {
            // return error
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Directorate[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const directorate = await this.prisma.directorate.findMany({
                take: limit,
                skip: offset
            });
            return directorate;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<Directorate> {

        let directorate: Directorate;
    
        try {
            directorate = await this.prisma.directorate.findUnique({where: {directorate_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
        
        if (!directorate) throw new NotFoundException(`La dirección con id ${id} no existe`);

        return directorate;
    }

    async update(id: number, updateDirectorateDto: UpdateDirectorateDto): Promise<Directorate> {
    
        await this.findOne(id);

        try {
            const updatedDirectorate = await this.prisma.directorate.update({
                where: {directorate_id: id},
                data: updateDirectorateDto
            });
            return updatedDirectorate;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }
}
