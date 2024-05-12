import { PathsObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

const authPaths: PathsObject = {
    '/api/auth/login': {
        get: {
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    mensaje: { type: 'string', example: 'Operación exitosa' },
                                    datos: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number', example: 1 },
                                            nombre: { type: 'string', example: 'Ejemplo' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default authPaths;
