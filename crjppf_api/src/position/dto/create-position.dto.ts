import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreatePositionDto {

    /**
     * Nombre del cargo
     * @example 'Director'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(70)
    name: string;

    /**
     * Indica si el cargo está activo
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}
