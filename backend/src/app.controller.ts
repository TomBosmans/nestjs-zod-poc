import { AppService } from "./app.service"
import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { TestSchema, testSchema } from "./schemas/test.schema"
import { UseSchema } from "./lib/zod/zod.decorator"
import { object, string } from "zod"

@Controller("test")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:id-:test")
  @UseSchema({
    param: object({ id: string(), test: string() }),
    response: { 200: testSchema, 400: testSchema },
  })
  getHello(@Param() { id }: { id: string }) {
    return { id, hello: "world", world: 123, random: "test" }
  }

  @Post()
  @UseSchema({ body: testSchema })
  postHello(@Body() body: TestSchema): string {
    console.log(body)
    return this.appService.getHello()
  }
}
