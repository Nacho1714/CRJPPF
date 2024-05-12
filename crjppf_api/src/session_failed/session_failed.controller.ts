import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { SessionFailedService } from './session_failed.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { SessionFailed } from './entities/session_failed.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('SessionFailed')
@Controller('session-failed')
export class SessionFailedController {
    constructor(private readonly sessionFailedService: SessionFailedService) {}

    /**
     * Listar todas las sesiones fallidas
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<SessionFailed[]> {
        return this.sessionFailedService.findAll(paginationDto);
    }

    /**
     * Buscar una sesión fallida por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<SessionFailed> {
        return this.sessionFailedService.findOne(id);
    }

}
