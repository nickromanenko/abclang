import serverlessExpress from '@codegenie/serverless-express';
import 'source-map-support/register';
import { app } from './app';

export const handler = serverlessExpress({ app });
