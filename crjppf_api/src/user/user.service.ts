import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger('UserService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.prisma.user.create({data: createUserDto});
            return user; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<User[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const users = await this.prisma.user.findMany({
                take: limit,
                skip: offset
            });
            return users;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number, select?: Prisma.userSelect ): Promise<User> {

        let user: User;

        try {
            user = await this.prisma.user.findUnique({
                where: {user_id: id},
                select
            });
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }

        if (!user) throw new NotFoundException(`El usuario con id ${id} no existe`);

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    
        await this.findOne(id);

        try {
            const updatedUser = await this.prisma.user.update({
                where: {user_id: id},
                data: updateUserDto
            });
            return updatedUser;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }
}
