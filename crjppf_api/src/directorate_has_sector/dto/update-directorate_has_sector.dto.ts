import { PartialType } from '@nestjs/swagger';
import { CreateDirectorateHasSectorDto } from './create-directorate_has_sector.dto';

export class UpdateDirectorateHasSectorDto extends PartialType(CreateDirectorateHasSectorDto) {}
