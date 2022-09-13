import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

type TableNameSelect = {
  tablename: string
}

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async $enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close()
    })
  }

  public async $truncateAll(): Promise<void> {
    const tableNames = await this.$getTableNames()
    for (const { tablename } of tableNames) {
      if (tablename !== "_prisma_migrations") {
        try {
          await this.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`)
        } catch (error) {
          console.log({ error })
        }
      }
    }
  }

  public async $getTableNames(): Promise<TableNameSelect[]> {
    return await this.$queryRaw<TableNameSelect[]>`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `
  }
}
