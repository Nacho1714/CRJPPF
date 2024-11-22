import { PartialType } from '@nestjs/swagger';
import { CreateInstitutionalDepartmentDto } from './create-institutional_department.dto';

export class UpdateInstitutionalDepartmentDto extends PartialType(CreateInstitutionalDepartmentDto) {}
