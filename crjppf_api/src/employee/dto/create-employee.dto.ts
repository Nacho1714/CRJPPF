import { IsBoolean, IsNumber, IsOptional, IsPositive, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateEmployeeDto {

    /**
     * Foreign Key del cargo
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Max(2147483647)
    position_fk?: number;
    
    /**
     * Foreign Key de la oficina
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    destination_fk: number;
    
    /**
     * Nombre del empleado
     * @example 'Ignacio Ezequiel'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    name: string;
    
    /**
     * Apellido del empleado
     * @example 'Barros'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;
    
    /**
     * Indicada si el empleado está activo
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;

}
