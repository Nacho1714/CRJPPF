import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SessionFailed } from './entities/session_failed.entity';

@Injectable()
export class SessionFailedService {

    private readonly logger = new Logger('SessionFailedService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(paginationDto: PaginationDto): Promise<SessionFailed[]> {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const session_failed = await this.prisma.session_failed.findMany({
                take: limit,
                skip: offset
            });
            return session_failed;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number): Promise<SessionFailed> {

        let session_failed: SessionFailed;

        try {
            session_failed = await this.prisma.session_failed.findUnique({where: {session_failed_id: id}});
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    
        if (!session_failed) throw new NotFoundException(`La sesion con id ${id} no existe`);

        return session_failed;
    }
}
