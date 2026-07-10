import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../utils/is-dev.util';
import { Request, Response } from 'express';

export const getGraphQLConfig = (
  configService: ConfigService,
): ApolloDriverConfig => {
  return {
    driver: ApolloDriver,
    autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: isDev(configService),
    context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  };
};
