import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto, UpdateSectorDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Sector } from './entities/sector.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('Sector')
@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService) {}

    /**
     * Crear un nuevo sector
     */
    @Post()
    create(@Body() createSectorDto: CreateSectorDto): Promise<Sector> {
        return this.sectorService.create(createSectorDto);
    }

    /**
     * Listar todos los sectores
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Sector[]> {
        return this.sectorService.findAll(paginationDto);
    }

    /**
     * Buscar un sector por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<Sector> {
        return this.sectorService.findOne(id);
    }

    /**
     * Actualizar un sector por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateSectorDto: UpdateSectorDto
    ): Promise<Sector> {
        return this.sectorService.update(id, updateSectorDto);
    }
}
