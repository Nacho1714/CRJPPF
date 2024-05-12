import * as fs from 'fs';
import { join } from 'path';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVisitorDto, FindVisitorDto, UpdateVisitorDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Visitor } from './entities/visitor.entity';
import { UserService } from '../user/user.service';
import { EmployeeService } from '../employee/employee.service';
import { DirectorateHasSectorService } from '../directorate_has_sector/directorate_has_sector.service';
import { ConfigService } from '@nestjs/config';
import { getOptionQuery, getRecordsPerDay } from '../common/helpers/filter.helpers';
import moment from 'moment-timezone';

@Injectable()
export class VisitorService {
    private readonly logger = new Logger('VisitorService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly employeeService: EmployeeService,
        private readonly directorateHasSectorService: DirectorateHasSectorService,
        private readonly configService: ConfigService
    ) {}

    async create(createUserDto: CreateVisitorDto, imageName: string | null = null): Promise<Visitor> {
        let visitor: Visitor;
        
        const {entry, exit} = createUserDto;

        try {
            visitor = await this.prisma.visitor.create({
                data: {
                    ...createUserDto,
                    image: imageName,
                    entry: entry 
                        ? new Date(moment(entry).format('YYYY-MM-DD HH:mm:ss') + 'Z') 
                        : new Date(moment().format('YYYY-MM-DD HH:mm:ss') + 'Z'),
                    exit: exit 
                        ? new Date(moment(exit).format('YYYY-MM-DD HH:mm:ss') + 'Z') 
                        : undefined
                }
            }) as Visitor;
        } catch (error) {
            if (imageName) this.deleteImage(`./static/visitor/${imageName}`);
            this.prisma.handleDBExeption(error, this.logger);
        }

        visitor.image = this.getPath(imageName);
        return visitor;
    }

    async findAll(findVisitorDto: FindVisitorDto) {

        const { limit, offset, entry, exit } = findVisitorDto;

        try {
            const visitors = await this.prisma.visitor.findMany({
                take: limit,
                skip: offset,
                where:{
                    entry: getRecordsPerDay(entry),
                    exit: getOptionQuery(exit)
                },
                include: {
                    user: {
                        select: {
                            profile: true
                        }
                    },
                    directorate_has_sector: {
                        select: {
                            name: true
                        
                        }
                    },
                    employee: {
                        select: {
                            last_name: true,
                            name: true
                        }
                    },
                },
                orderBy: {
                    last_name: 'asc'
                }
            });

            visitors.forEach(visitor => {
                visitor.image = this.getPath(visitor.image);
            });

            return visitors;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<Visitor> {
    
        let visitor: Visitor;

        try {
            visitor = await this.prisma.visitor.findUnique({
                where: {visitor_id: id},
                include: {
                    user: {
                        select: {
                            profile: true
                        }
                    },
                    directorate_has_sector: {
                        select: {
                            name: true
                        }
                    },
                    employee: {
                        select: {
                            last_name: true,
                            name: true,
                        },
                    }
                }
            }) as Visitor;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }

        if (!visitor) throw new NotFoundException(`El visitante con id ${id} no existe`);

        visitor.image = this.getPath(visitor.image);

        return visitor;
    }

    async update(id: number, updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    
        await this.findOne(id);

        if(updateVisitorDto.user_fk)
            await this.userService.findOne(updateVisitorDto.user_fk);

        if(updateVisitorDto.employee_fk)
            await this.employeeService.findOne(updateVisitorDto.employee_fk);

        if(updateVisitorDto.destination_fk)
            await this.directorateHasSectorService.findOne(updateVisitorDto.destination_fk);

        const {entry, exit} = updateVisitorDto;

        try {
            const updatedVisitor = await this.prisma.visitor.update({
                where: {visitor_id: id},
                data: {
                    ...updateVisitorDto,
                    entry: entry 
                        ? new Date(moment(entry).format('YYYY-MM-DD HH:mm:ss') + 'Z') 
                        : undefined,
                    exit: exit 
                        ? new Date(moment(exit).format('YYYY-MM-DD HH:mm:ss') + 'Z') 
                        : undefined
                }
            }) as Visitor;
            return updatedVisitor;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
    }

    private getPath(imageName: string) {
        const hostApi = this.configService.get('HOST_API');

        if (!hostApi) throw new NotFoundException('HOST_API is not defined');

        const secureUrl = `${hostApi}/visitor/image/${imageName}`;

        return secureUrl;
    }

    getStaticVisitorImage(imageName: string) {

        // const path = join(this.configService.get('IMAGE_FOLDER_PATH'), imageName)
        const path = join(__dirname, '../../static/visitor', imageName)

        if (!fs.existsSync(path)) throw new BadRequestException('Image not found')

        return path;
    }

    private deleteImage(path: string) {
        fs.unlink(path, (err) => {
            if (err) throw new InternalServerErrorException('Could not delete image');
        })
    }
}
