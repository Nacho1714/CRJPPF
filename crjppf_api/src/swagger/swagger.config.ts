// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import metadata from '../metadata';

// import authPaths from './auth.document'

export async function setupSwagger(app: INestApplication): Promise<void> {
    const config = new DocumentBuilder()
        .setTitle('Cajapf RESTFul API')
        .setDescription('cajapf access endpoints.')
        .setVersion('1.0')
        .addBearerAuth()

        .build();
    await SwaggerModule.loadPluginMetadata(metadata)
        
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [PaginationDto],
        // ignoreGlobalPrefix: true
    });

    document.paths = {
        ...document.paths,
        // ...authPaths
    };

    SwaggerModule.setup('/', app, document);
}

