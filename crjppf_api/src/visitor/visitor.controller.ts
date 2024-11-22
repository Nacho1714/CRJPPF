import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseInterceptors, UploadedFile, ValidationPipe, Res } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { CreateVisitorDto, UpdateVisitorDto, FindVisitorDto, DateRangeDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Auth } from '../auth/decorators';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';


@ApiTags('Visitor')
@Controller('visitor')
export class VisitorController {
    constructor(private readonly visitorService: VisitorService) {}

    /**
     * Crear un nuevo visitante
     */
    @Auth()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    create(
        @Body(new ValidationPipe()) createVisitorDto: CreateVisitorDto,
        @UploadedFile() file?: Express.Multer.File
    ) {

        let filename: string | null = null;
        if (file) filename = file.filename;

        return this.visitorService.create(createVisitorDto, filename);
    }

    /**
     * Listar todos los visitantes
     */
    @Auth()
    @Post('findAll')
    findAll(
        @Query() findVisitorDto: FindVisitorDto,
        @Body(new ValidationPipe()) dateRange: DateRangeDto
    )  {

        return this.visitorService.findAll(findVisitorDto, dateRange)
    }

    /**
     * Buscar las fechas de los registros existentes
     */
    @Get('date')
    async getDates(){
        return this.visitorService.getDates()
    }

    /**
     * Buscar los años de los registros existentes
     */
    @Get('year')
    async getYears(){
        return this.visitorService.getYears()
    }
        
    /**
     * Buscar los años de los registros existentes
     */
    @Get('month/:year')
    async getMonth(@Param('year', ParseIntPipe, ParamIdPipeTsPipe) year: number){
        return this.visitorService.getMonth(year)
    }
        
    /**
     * Buscar un visitante por su id
     */
    @Auth()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.visitorService.findOne(id);
    }

    /**
     * Buscar una imagen de un visitante por su nombre
     */
    @Get('image/:imageName')
    findImage(
        @Res() res: Response,
        @Param('imageName') imageName: string
    ) {
        const path = this.visitorService.getStaticVisitorImage(imageName);
        res.sendFile(path);
    }

    /**
     * Actualizar un visitante por su id
     */
    @Auth()
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateVisitorDto: UpdateVisitorDto
    ) {
        return this.visitorService.update(id, updateVisitorDto);
    }
}
