import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistroModule } from './auth/module/registro.module';
import { LoginModule } from './auth/module/login.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/registro-usuario-nest'),
    RegistroModule,
    LoginModule,
  ],
})
export class AppModule {}
