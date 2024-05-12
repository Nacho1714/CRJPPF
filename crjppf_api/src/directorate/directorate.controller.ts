import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, Req, Headers } from '@nestjs/common';
import { DirectorateService } from './directorate.service';
import { CreateDirectorateDto, UpdateDirectorateDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Directorate } from './entities/directorate.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('Directorate')
@Controller('directorate')
export class DirectorateController {
    constructor(private readonly directorateService: DirectorateService) {}

    /**
     * Crear una nueva dirección
     */
    @Post()
    create(@Body() createDirectorateDto: CreateDirectorateDto): Promise<Directorate> {
        return this.directorateService.create(createDirectorateDto);
    }

    /**
     * Listar todas las direcciones
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Directorate[]>{
        return this.directorateService.findAll(paginationDto);
    }

    /**
     * Buscar una dirección por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<Directorate> {
        return this.directorateService.findOne(id);
    }

    /**
     * Actualizar una dirección por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateDirectorateDto: UpdateDirectorateDto
    ):Promise<Directorate> {
        return this.directorateService.update(id, updateDirectorateDto);
    }
}
