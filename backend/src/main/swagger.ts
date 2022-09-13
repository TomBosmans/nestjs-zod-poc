import { INestApplication } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export default async function swagger(app: INestApplication) {
  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>("SWAGGER_TITLE"))
    .setDescription(configService.get<string>("SWAGGER_DESCRIPTION"))
    .setVersion(configService.get<string>("SWAGGER_VERSION"))
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)
}
