import { INestApplication } from "@nestjs/common"
import { DatabaseInterceptor, DatabaseService } from "src/modules/database"

export default async function database(app: INestApplication) {
  await app.get(DatabaseService).$enableShutdownHooks(app)
  app.useGlobalInterceptors(new DatabaseInterceptor())
}
