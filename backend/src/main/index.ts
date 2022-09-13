import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app.module"
import database from "./database"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await database(app)
  await app.listen(3100)
}

void bootstrap()
