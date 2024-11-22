import { PartialType } from '@nestjs/swagger';
import { CreateGovernmentInstitutionDto } from './create-government_institution.dto';

export class UpdateGovernmentInstitutionDto extends PartialType(CreateGovernmentInstitutionDto) {}
