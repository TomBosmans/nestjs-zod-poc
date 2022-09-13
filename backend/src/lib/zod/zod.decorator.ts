import { applyDecorators, UseInterceptors, UsePipes } from "@nestjs/common"
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger"
import { TransformInterceptor } from "./zod.interceptor"
import { ZodValidationPipe } from "./zod.pipe"
import { Schema } from "./zod.types"
import { zodToJson } from "./zod.utils"

export function UseSchema(schema: Schema) {
  return applyDecorators(
    UsePipes(new ZodValidationPipe(schema)),
    ...applyParamDecorators(schema),
    ...applyQueryDecorators(schema),
    ...applyBodyDecorators(schema),
    ...applyResponseDecorators(schema),
  )
}

function applyQueryDecorators({ query }: Schema) {
  if (!query) return []
  return [ApiQuery({ name: "query", schema: zodToJson(query) })]
}

function applyBodyDecorators({ body }: Schema) {
  if (!body) return []
  return [ApiBody({ schema: zodToJson(body) })]
}

function applyParamDecorators({ param }: Schema) {
  if (!param) return []
  return [ApiParam({ name: "param", schema: zodToJson(param) })]
}

function applyResponseDecorators({ response }: Schema) {
  if (!response) return []

  const statuses = Object.keys(response)
  return statuses.reduce((decorators: [], status: string) => {
    const schema = response[status]
    return [
      ...decorators,
      ApiResponse({ status: Number(status), schema: zodToJson(schema) }),
      UseInterceptors(new TransformInterceptor(schema))
    ]
  }, [])
}
