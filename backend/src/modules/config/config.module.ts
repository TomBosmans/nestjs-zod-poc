import { ConfigModule } from "@nestjs/config"
import { configSchema } from "./config.schema"

export const DynamicConfigModule = ConfigModule.forRoot({
  envFilePath: [`.env.${process.env.NODE_ENV ?? ""}`],
  validate: (config: Record<string, any>) => {
    return configSchema.parse(config)
  },
})
