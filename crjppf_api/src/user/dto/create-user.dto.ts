import { IsBoolean, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    /**
     * Nombre del usuario
     * @example 'Juan'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    name: string;
    
    /**
     * Apellido del usuario
     * @example 'Perez'
     */
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;

    /**
     * Nombre de usuario
     * @example 'baig'
     */
    @IsString()
    @MinLength(4, {message: 'El nombre de usuario debe tener 4 caracteres'})
    @MaxLength(4, {message: 'El nombre de usuario debe tener 4 caracteres'})
    profile: string;

    /**
     * Contraseña
     * @example '43568465'
     */
    @IsString()
    @MinLength(8, {message: 'La contraseña debe tener minimo 8 caracteres'})
    @MaxLength(255, {message: 'La contraseña debe tener maximo 16 caracteres'})
    password: string;

    /**
     * Indicada si el usuario está activo
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}
