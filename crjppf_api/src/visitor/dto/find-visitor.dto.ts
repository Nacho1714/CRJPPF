import { IsDate, IsOptional } from "class-validator";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { Type } from "class-transformer";


export class FindVisitorDto extends PaginationDto {

    /**
     * Fecha de entrada
     * @example 2024-02-03
     */
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    entry?: Date;

    /**
     * Fecha de salida
     */
    @IsOptional()
    exit?: boolean;

}