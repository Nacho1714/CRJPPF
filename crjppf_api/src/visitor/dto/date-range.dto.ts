import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDto {

    @IsDateString()
    @IsOptional()
    startDate: string; // Recibirá '2024-11-01'
    
    @IsDateString()
    @IsOptional()
    endDate: string; // Recibirá '2024-11-30'
}