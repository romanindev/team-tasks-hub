import { plainToInstance } from 'class-transformer';
import {
  IsNumberString,
  IsString,
  validateSync,
  MinLength,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumberString()
  PORT!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  @MinLength(10)
  JWT_SECRET!: string;

  @IsString()
  JWT_EXPIRES_IN!: string;
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
