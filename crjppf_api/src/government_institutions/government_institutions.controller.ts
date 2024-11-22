import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { GovernmentInstitutionsService } from './government_institutions.service';
import { CreateGovernmentInstitutionDto, UpdateGovernmentInstitutionDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { GovernmentInstitution } from './entities/government_institution.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('GovernmentInstitutions')
@Controller('government-institutions')
export class GovernmentInstitutionsController {

    constructor(private readonly governmentInstitutionsService: GovernmentInstitutionsService) {}

    /**
     * Crear una nueva institucion de gobierno
     */
    @Post()
    create(@Body() createGovernmentInstitutionDto: CreateGovernmentInstitutionDto): Promise<GovernmentInstitution> {
        return this.governmentInstitutionsService.create(createGovernmentInstitutionDto);
    }

    /**
     * Listar todas las instituciones de gobierno
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<GovernmentInstitution[]>{
        return this.governmentInstitutionsService.findAll(paginationDto);
    }

    /**
     * Buscar una institucion de gobierno por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<GovernmentInstitution> {
        return this.governmentInstitutionsService.findOne(id);
    }

    /**
     * Actualizar una institucion de gobierno por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateGovernmentInstitutionDto: UpdateGovernmentInstitutionDto
    ):Promise<GovernmentInstitution> {
        return this.governmentInstitutionsService.update(id, updateGovernmentInstitutionDto);
    }
}
