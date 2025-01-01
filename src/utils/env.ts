// ? This file is used to validate the environment variables
//? also its adding them to global process.env for auto completion
import { z, type TypeOf } from "zod";
import { config } from "dotenv";
config();
const zodEnv = z.object({
  DATABASE_URI: z.string(),
  PORT_NO: z.string(),
});
declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}
try {
  zodEnv.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field,
      )
      .join("\n  ");
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}
