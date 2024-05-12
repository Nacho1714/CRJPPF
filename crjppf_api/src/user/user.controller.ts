import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Auth()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Crear un nuevo usuario
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    /**
     * Listar todos los usuarios
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<User[]> {
        return this.userService.findAll(paginationDto);
    }

    /**
     * Buscar un usuario por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    /**
     * Actualizar un usuario por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}
