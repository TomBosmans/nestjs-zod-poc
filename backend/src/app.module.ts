import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DynamicConfigModule } from "./modules/config/config.module"
import { DatabaseModule } from "./modules/database/database.module"

@Module({
  imports: [DynamicConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
