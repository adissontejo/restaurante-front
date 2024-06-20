import { FieldErrors, FieldValues, Path, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

export interface UseZodResolverProps<T extends FieldValues> {
  schema?: ZodSchema;
  validate?: (data: T) => Promise<{
    errors?: Partial<Record<keyof T, string>>;
  } | void>;
}

export const useZodResolver = <T extends FieldValues = FieldValues>({
  schema,
  validate,
}: UseZodResolverProps<T>): Resolver<T> => {
  return async (data, context, options) => {
    let values = {};
    let errors: FieldErrors<T> = {};

    if (schema) {
      const result = await zodResolver(schema)(data, context, options);

      (values = result.values), (errors = result.errors);
    }

    if (validate) {
      const result = await validate(data);

      if (result && result.errors) {
        Object.keys(result.errors).forEach((key: keyof T) => {
          const error = result.errors?.[key];

          if (error && !errors[key as Path<T>]) {
            errors[key as Path<T>] = {
              message: error,
            } as FieldErrors<T>[Path<T>];
          }
        });
      }
    }

    return {
      values,
      errors,
    };
  };
};
