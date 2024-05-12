import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Employee } from './entities/employee.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PositionService } from '../position/position.service';
import { DirectorateHasSectorService } from '../directorate_has_sector/directorate_has_sector.service';

@Injectable()
export class EmployeeService {

    private readonly logger = new Logger('EmployeeService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly positionService: PositionService,
        private readonly directorateHasSectorService: DirectorateHasSectorService
    ) {}
    
    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        try {
            const employee = await this.prisma.employee.create({data: createEmployeeDto}); 
            return employee;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Employee[]> {

        const {limit, offset} = paginationDto;

        try {
            const employees = await this.prisma.employee.findMany({
                take: limit,
                skip: offset,
                orderBy: {last_name: 'asc'}
            });
            return employees;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number): Promise<Employee> {

        let employee: Employee;

        try {
            employee = await this.prisma.employee.findUnique({where: {employee_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
        if (!employee) throw new NotFoundException(`El empleado con id ${id} no existe`);

        return employee;
    }

    async findByOffice(id: number): Promise<Employee[]> {

        try {
            const employee = await this.prisma.employee.findMany({
                where: {destination_fk: id},
                orderBy: {last_name: 'asc'}
            }) as Employee[];
            return employee;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {

        await this.findOne(id);

        if (updateEmployeeDto.position_fk)
        await this.positionService.findOne(updateEmployeeDto.position_fk);

        if (updateEmployeeDto.destination_fk)
        await this.directorateHasSectorService.findOne(updateEmployeeDto.destination_fk);

        try {
            const updatedEmployee = await this.prisma.employee.update({
                where: {employee_id: id},
                data: updateEmployeeDto
            })

            return updatedEmployee; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }

    }
}
