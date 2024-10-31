import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import databaseConfig from './config/database.config';
import { ModulesRegistery } from './module.registry';
import { ApolloDriver } from '@nestjs/apollo';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : "src/config/env/dev.env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => databaseConfig(configService),
    }),
    GraphQLModule.forRoot({
      driver : ApolloDriver,
      playground: true,
      autoSchemaFile : true,
      sortSchema: true,
    }),
    ModulesRegistery,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {
  constructor() {
    console.log("root module");
  }
}
