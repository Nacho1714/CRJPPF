import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateSectorDto {

    /**
     * Nombre del sector
     * @example 'DEPARTAMENTO PASIVIDADES'
     */
    @Matches("^[A-Za-znÑ ]+$")
    @MinLength(2)
    @MaxLength(40)
    name: string;

    /**
     * Indica si el sector está activo
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}
