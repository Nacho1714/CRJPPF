import { Matches, MaxLength, MinLength } from "class-validator";

export class CreateGovernmentInstitutionDto {

    /**
     * Nombre de la dirección
     * @example 'Dirección de Informática'
     */
    @Matches("^[A-Za-znÑ ]+$")
    @MinLength(2)
    @MaxLength(40)
    name: string;
}
