import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParamIdPipeTsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        if (value < 0 || value > 2147483647)
            throw new BadRequestException(`"${value}" is not a valid id`)

        return value;
    }
}
