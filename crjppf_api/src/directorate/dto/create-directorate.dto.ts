import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateDirectorateDto {

    /**
     * Nombre de la dirección
     * @example 'Dirección de Informática'
     */
    @Matches("^[A-Za-znÑ ]+$")
    @MinLength(2)
    @MaxLength(40)
    name: string;

    /**
     * Indica si la dirección está activa
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}
