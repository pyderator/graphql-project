import { AuthError } from "../generated/graphql";

export const errorMap = (errors: AuthError[]) => {
  const mappedErrors: Record<string, string> = {};
  errors.forEach(({ field, msg }) => {
    mappedErrors[field] = msg;
  });
  return mappedErrors;
};
