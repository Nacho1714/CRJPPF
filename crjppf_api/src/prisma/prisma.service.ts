import { Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    // private readonly logger = new Logger('EmployeeService')

    async onModuleInit() {
        await this.$connect();
    }

    // TODO: averiguar como tipar "e"
    handleDBExeption(e: any, logger: Logger) {

        if (e instanceof Prisma.PrismaClientKnownRequestError) {

            // let message: string;
            // TODO: averiguar como hace fernando para definir una interfaz y decirle a ts lo que recibe "e"
            let message

            switch (e.code) {
                case 'P2002':
                    const {target} = e.meta
                    message = `Unique constraint failed on the [${target}]`
                    break;
                case 'P2003':
                    const {field_name} = e.meta
                    message = `Foreign key constraint failed on the field: [${field_name}]`
                    break;
                case 'P2010':
                    const {message: metaMessage, code} = e.meta
                    message = `Raw query failed. Code: ${code}. Message: [${metaMessage}]`
                    break;
                    default:
                    logger.error('[PrismaClientKnownRequestError] - Codigo de error no manejado: ', e.code)
                    throw new InternalServerErrorException('Error inesperado, revisar server logs');
            }
            
            logger.error(message)
            throw new NotFoundException(message);
        }

        if (e instanceof Prisma.PrismaClientUnknownRequestError) {
            logger.error('[PrismaClientUnknownRequestError]')
            throw new InternalServerErrorException('Error inesperado, revisar server logs');
        }

        if (e instanceof Prisma.PrismaClientValidationError) {
            logger.error('[PrismaClientValidationError] - Dato faltante o tipo de dato incorrecto')
            throw new InternalServerErrorException('Error inesperado, revisar server logs');
        }
    }
}