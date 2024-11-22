import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { InstitutionalDepartmentsService } from './institutional_departments.service';
import { CreateInstitutionalDepartmentDto, UpdateInstitutionalDepartmentDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { InstitutionalDepartment } from './entities/institutional_department.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('InstitutionalDepartments')
@Controller('institutional-departments')
export class InstitutionalDepartmentsController {

    constructor(private readonly institutionalDepartmentsService: InstitutionalDepartmentsService) {}

    /**
     * Crear un nuevo departamento institucional
     */
    @Post()
    create(@Body() createInstitutionalDepartmentDto: CreateInstitutionalDepartmentDto): Promise<InstitutionalDepartment> {
        return this.institutionalDepartmentsService.create(createInstitutionalDepartmentDto);
    }

    /**
     * Listar todos los departamentos institucionales
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<InstitutionalDepartment[]>{
        return this.institutionalDepartmentsService.findAll(paginationDto);
    }

    /**
     * Buscar un departamento institucional por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<InstitutionalDepartment> {
        return this.institutionalDepartmentsService.findOne(id);
    }

    /**
     * Buscar departamentos por instituciones de gobierno
     */
    @Get('government-institutions/:id')
    findByGovernmentInstitution(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<InstitutionalDepartment[]> {

        return this.institutionalDepartmentsService.findByGovernmentInstitution(id);
    }

    /**
     * Actualizar un departamento institucional por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateInstitutionalDepartmentDto: UpdateInstitutionalDepartmentDto
    ):Promise<InstitutionalDepartment> {
        return this.institutionalDepartmentsService.update(id, updateInstitutionalDepartmentDto);
    }
}
