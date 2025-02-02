import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class FieldsValidator {
    async validateBody<T extends Record<string, any>>(
        data: any,
        dtoClass: new () => T,
      ): Promise<T> {
        const dtoInstance = plainToClass(dtoClass, data);
        const errors = await validate(dtoInstance);
    
        if (errors.length > 0) {
          const formattedErrors = this.flattenValidationErrors(errors);
          throw new BadRequestException({
            statusCode: 400,
            message: "Validation failed",
            errors: formattedErrors,
          });
        }
    
        return dtoInstance;
      }

      private flattenValidationErrors(
        errors: any[],
      ): Record<string, string[]> {
        const result: Record<string, string[]> = {};
    
        errors.forEach((error) => {
          if (error.constraints && typeof error.constraints === "object") {
            result[error.property] = Object.values(
              error.constraints as Record<string, string>,
            );
          }
    
          if (error.children && error.children.length > 0) {
            const childErrors = this.flattenValidationErrors(error.children);
            Object.assign(result, childErrors);
          }
        });
    
        return result;
      }
}