import { plainToInstance } from 'class-transformer';
import { IsNumberString, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumberString()
  PORT!: string;

  @IsString()
  DATABASE_URL!: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors.toString()}`);
  }

  return validatedConfig;
}
