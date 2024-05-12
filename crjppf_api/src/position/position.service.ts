import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { Position } from './entities/position.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PositionService {
    private readonly logger = new Logger('PositionService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createPositionDto: CreatePositionDto): Promise<Position> {
        try {
            const position = await this.prisma.position.create({data: createPositionDto});
            return position; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Position[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const positions = await this.prisma.position.findMany({
                take: limit,
                skip: offset
            });
            return positions;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<Position> {
    
        let position: Position;

        try {
            position = await this.prisma.position.findUnique({where: {position_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }

        if (!position) throw new NotFoundException(`El cargo con id ${id} no existe`);

        return position;
    }

    async update(id: number, updatePositionDto: UpdatePositionDto): Promise<Position> {
    
        await this.findOne(id);

        try {
            const updatedPosition = await this.prisma.position.update({
                where: {position_id: id},
                data: updatePositionDto
            });
            return updatedPosition;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }
}
