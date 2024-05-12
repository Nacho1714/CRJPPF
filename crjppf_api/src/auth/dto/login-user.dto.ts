import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

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
     * @example '43721804'
     */
    @IsString()
    @MinLength(8, {message: 'La contraseña debe tener minimo 8 caracteres'})
    @MaxLength(255, {message: 'La contraseña debe tener maximo 16 caracteres'})
    password: string;
}
