import { Type } from "class-transformer";
import { IsNumber, IsPositive, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateInstitutionalDepartmentDto {

    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    @Type(() => Number)
    government_institutions_fk: number;
    
    @Matches("^[A-Za-z\s''ñÑ. ]+$")
    @MinLength(2)
    @MaxLength(100)
    name: string;
}
