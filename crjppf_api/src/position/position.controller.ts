import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Position } from './entities/position.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('Position')
@Controller('position')
export class PositionController {
    constructor(private readonly positionService: PositionService) {}

    /**
     * Crear un nuevo cargo
     */
    @Post()
    create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
        return this.positionService.create(createPositionDto);
    }

    /**
     * Listar todos los cargos
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Position[]> {
        return this.positionService.findAll(paginationDto);
    }

    /**
     * Buscar un cargo por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<Position> {
        return this.positionService.findOne(id);
    }

    /**
     * Actualizar un cargo por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updatePositionDto: UpdatePositionDto
    ): Promise<Position> {
        return this.positionService.update(id, updatePositionDto);
    }
}
