import { IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateDirectorateHasSectorDto {

    /**
     * Foreign Key de la dirección
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    directorate_fk: number;

    /**
     * Foreign Key del sector
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    sector_fk: number;

    /**
     * Nombre de la oficina
     * @example 'PRESIDENCIA - DEPARTAMENTO PASIVIDADES'
     */
    @Matches("^[A-Za-znÑ -]+$")
    @MinLength(2)
    @MaxLength(80)
    @IsOptional()
    name?: string;
    
    /**
     * Piso del edificio
     * @example '1'
     */
    @IsString()
    @Matches("^[0-9]+$")
    @MinLength(1)
    @MaxLength(1)
    @IsOptional()
    level?: string = null;
}
