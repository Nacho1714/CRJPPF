import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGovernmentInstitutionDto, UpdateGovernmentInstitutionDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { GovernmentInstitution } from './entities/government_institution.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class GovernmentInstitutionsService {

    private readonly logger = new Logger('GovernmentInstitutionsService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createGovernmentInstitutionDto: CreateGovernmentInstitutionDto): Promise<GovernmentInstitution> {
        try {
            const governmentInstitution = await this.prisma.government_institutions.create({data: createGovernmentInstitutionDto});
            return governmentInstitution; 
        } catch (error) {
            // return error
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<GovernmentInstitution[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const governmentInstitution = await this.prisma.government_institutions.findMany({
                take: limit,
                skip: offset
            });
            return governmentInstitution;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<GovernmentInstitution> {

        let governmentInstitution: GovernmentInstitution;
    
        try {
            governmentInstitution = await this.prisma.government_institutions.findUnique({where: {government_institutions_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
        
        if (!governmentInstitution) throw new NotFoundException(`La institución gubernamental con id ${id} no existe`);

        return governmentInstitution;
    }

    async update(id: number, updateGovernmentInstitutionDto: UpdateGovernmentInstitutionDto): Promise<GovernmentInstitution> {
    
        await this.findOne(id);

        try {
            const updatedGovernmentInstitution = await this.prisma.government_institutions.update({
                where: {government_institutions_id: id},
                data: updateGovernmentInstitutionDto
            });
            return updatedGovernmentInstitution;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
