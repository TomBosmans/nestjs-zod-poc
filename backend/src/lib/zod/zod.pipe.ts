import { PipeTransform, Injectable, ArgumentMetadata, UnprocessableEntityException } from "@nestjs/common"
import { Schema } from "./zod.types"

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === "query" && this.schema?.query) return this.transformQuery(value)
    if (metadata.type === "param" && this.schema?.param) return this.transformParam(value)
    if (metadata.type === "body" && this.schema?.body) return this.transformBody(value)

    throw new UnprocessableEntityException()
  }

  private transformQuery(value: unknown) {
    const result = this.schema.query?.safeParse(value)
    if (result.success) return result.data

    throw new UnprocessableEntityException({ msg: result })
  }

  private transformParam(value: unknown) {
    const result = this.schema.param?.safeParse(value)
    if (result.success) return result.data

    throw new UnprocessableEntityException({ msg: result })
  }

  private transformBody(value: unknown) {
    const result = this.schema.body?.safeParse(value)
    if (result.success) return result.data

    throw new UnprocessableEntityException({ msg: result })
  }
}
