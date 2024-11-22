import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInstitutionalDepartmentDto, UpdateInstitutionalDepartmentDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { InstitutionalDepartment } from './entities/institutional_department.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class InstitutionalDepartmentsService {

    private readonly logger = new Logger('InstitutionalDepartmentsService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createInstitutionalDepartmentDto: CreateInstitutionalDepartmentDto): Promise<InstitutionalDepartment> {
        try {
            const institutionalDepartment = await this.prisma.institutional_departments.create({data: createInstitutionalDepartmentDto});
            return institutionalDepartment; 
        } catch (error) {
            // return error
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<InstitutionalDepartment[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const directorate = await this.prisma.institutional_departments.findMany({
                take: limit,
                skip: offset
            });
            return directorate;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<InstitutionalDepartment> {

        let institutionalDepartment: InstitutionalDepartment;
    
        try {
            institutionalDepartment = await this.prisma.institutional_departments.findUnique({where: {institutional_departments_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
        
        if (!institutionalDepartment) throw new NotFoundException(`El departamento institucional con id ${id} no existe`);

        return institutionalDepartment;
    }

    async findByGovernmentInstitution(id: number): Promise<InstitutionalDepartment[]> {

        try {
            const employee = await this.prisma.institutional_departments.findMany({
                where: {government_institutions_fk: id},
                orderBy: {name: 'asc'}
            }) as InstitutionalDepartment[];
            return employee;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async update(id: number, updateInstitutionalDepartmentDto: UpdateInstitutionalDepartmentDto): Promise<InstitutionalDepartment> {
    
        await this.findOne(id);

        try {
            const updatedDirectorate = await this.prisma.institutional_departments.update({
                where: {institutional_departments_id: id},
                data: updateInstitutionalDepartmentDto
            });
            return updatedDirectorate;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }
}
