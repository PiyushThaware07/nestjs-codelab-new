import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";



const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: "postgres",
    username: configService.get<string>("DB_USERNAME", "postgres"),
    password: configService.get<string>("DB_PASSWORD", "root"),
    database: configService.get<string>("DB_DATABASE", "mycodelab"),
    schema: configService.get<string>("DB_SCHEMA", "public"),
    host: configService.get<string>("DB_HOST", "localhost"),
    port: configService.get<number>("DB_PORT", 5432),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // autoLoadEntities: true,
    synchronize: true,
    logging: configService.get<boolean>('DB_LOGGING', false),
    extra: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    },
})

export default databaseConfig;