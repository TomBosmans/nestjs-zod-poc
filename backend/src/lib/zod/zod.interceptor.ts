import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ZodSchema } from "zod"

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private schema: ZodSchema) {}

  public intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => this.transformResponse(data)))
  }

  private transformResponse(data: unknown) {
    const result = this.schema.safeParse(data)
    if (result.success) return result.data as Response<T>

    throw new UnprocessableEntityException({ msg: "Response doesn't match the schema." })
  }
}
