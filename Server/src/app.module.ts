import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from './utils/entities';
import { CONTROLLERS } from './utils/controllers';
import { SERVICES } from './utils/services';
import { importData } from './utils/scaffold-data';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',      // ou 'mysql', 'sqlite' etc
      host: 'localhost',
      port: 5432,            // 3306 para MySQL
      username: 'postgres',  // seu usuário do DB
      password: 'localpassword',  // sua senha do DB
      database: 'destify',   // nome do banco
      entities: [__dirname + '/**/*.entity{.ts,.js}'],      // entidades usadas
      synchronize: true,
    }),
  TypeOrmModule.forFeature(ENTITIES)  
  ],
  controllers: CONTROLLERS,
  providers: SERVICES,
})
export class AppModule implements OnModuleInit {

  constructor(private ds:DataSource){}

  onModuleInit() {
    importData(this.ds);
  }

  
}
