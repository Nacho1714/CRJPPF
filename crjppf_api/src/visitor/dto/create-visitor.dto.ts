import { IsDate, IsIn, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { document_options } from "../../common/interfaces/enum/document_options.enum"
import { ApiProperty } from "@nestjs/swagger";
import moment from "moment";

export class CreateVisitorDto {

    /**
     * Foreign Key del usuario
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    @Type(() => Number)
    user_fk: number;
    
    /**
     * Foreign Key del empleado
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    @Type(() => Number)
    employee_fk: number;

    /**
     * Foreign Key de la oficina
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    @Type(() => Number)
    destination_fk: number;

    /**
     * Nombre del visitante
     * @example 'Juan'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    /**
     * Apellido del visitante
     * @example 'Perez'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;

    /**
     * Tipo de documento
     * @example 'DNI'
     */
    @IsString()
    @IsIn(['DNI','LE','LC','PAS'])
    document_type: document_options;

    /**
     * Número de documento
     * @example '43568465'
     */
    @IsString()
    @Matches("^[A-Za-znÑ0-9]+$")
    @MinLength(2)
    @MaxLength(20)
    document_number: string;
    
    /**
     * Nota
     * @example 'Es un visitante importante'
     */
    @IsString()
    @MaxLength(200)
    @IsOptional()
    note?: string = null;

    /**
     * Fecha de ingreso
     * @example '2024-02-03 06:51:05.183'
     */
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    entry?: Date;
    
    /**
     * Fecha de salida
     * @example '2024-02-03 09:22:23.124'
     */
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    exit?: Date = null;
    
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    file?: any
}
