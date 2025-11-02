import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  PORT: z.string().optional(),
  IP: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.issues
    .map(err => {
      const path = err.path.join(".");
      return `  - ${path}: ${err.message}`;
    })
    .join("\n");

  console.error("Environment validation failed:");
  console.error(errors);
  throw new Error("Environment validation failed");
}

export const env: z.infer<typeof envSchema> = parsed.data;

export const envRequired = <K extends keyof typeof env>(name: K): string => {
  const value = env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
};

export const envWithDefault = <K extends keyof typeof env>(
  name: K,
  defaultValue: string
): string => {
  return (env[name] as string) || defaultValue;
};
