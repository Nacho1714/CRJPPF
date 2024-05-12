import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    /**
     * Crear un nuevo empleado
     */
    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeService.create(createEmployeeDto);
    }

    /**
     * Listar todos los empleados
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Employee[]> {
        return this.employeeService.findAll(paginationDto);
    }

    /**
     * Buscar un empleado por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<Employee> {
        return this.employeeService.findOne(id);
    }

    /**
     * Buscar empleados por oficina
     */
    @Get('office/:id')
    findByOffice(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<Employee[]> {
        return this.employeeService.findByOffice(id);
    }

    /**
     * Actualizar un empleado por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ): Promise<Employee> {
        return this.employeeService.update(id, updateEmployeeDto);
    }

}
