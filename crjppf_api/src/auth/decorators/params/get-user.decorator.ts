import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { user as User } from "@prisma/client";

export const GetUser = createParamDecorator(

    // Esto es un decorador de parámetros que solamente se encarga de obtener el usuario del request

    (data, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();
        const user = data ? req.user[data] as User : req.user as User; 

        return user; 

    }
)