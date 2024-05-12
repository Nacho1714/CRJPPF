import { IsString } from "class-validator";

export class TokenUserDto {

    /**
     * Token
     * @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNzYsImlhdCI6MTcwNzY5NDYzOSwiZXhwIjoxNzA3NzgxMDM5fQ.ZGodi1dWraNjuE2cAk8tON-tZMJb0xLvc2rgYn7zVO8'
     */
    @IsString()
    token: string;

}
