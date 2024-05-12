import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DirectorateHasSectorService } from './directorate_has_sector.service';
import { CreateDirectorateHasSectorDto, UpdateDirectorateHasSectorDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { DirectorateHasSector } from './entities/directorate_has_sector.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@Controller('destination')
@ApiTags('DirectorateHasSector')
export class DirectorateHasSectorController {
    constructor(private readonly directorateHasSectorService: DirectorateHasSectorService) {}

    /**
     * Crear una nueva relación entre dirección y sector
     */
    @Post()
    create(@Body() createDirectorateHasSectorDto: CreateDirectorateHasSectorDto): Promise<DirectorateHasSector> {
        return this.directorateHasSectorService.create(createDirectorateHasSectorDto);
    }

    /**
     * Listar todas las relaciones entre dirección y sector
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<DirectorateHasSector[]> {
        return this.directorateHasSectorService.findAll(paginationDto);
    }

    /**
     * Buscar una relación entre dirección y sector por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<DirectorateHasSector> {
        return this.directorateHasSectorService.findOne(id);
    }

    /**
     * Actualizar una relación entre dirección y sector por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateDirectorateHasSectorDto: UpdateDirectorateHasSectorDto
    ): Promise<DirectorateHasSector> {
        return this.directorateHasSectorService.update(id, updateDirectorateHasSectorDto);
    }
}
