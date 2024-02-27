import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from '../controllers/login.controller';
import { LoginService } from '../services/login.service';

import {
  LoginUsuarioLoginSchema,
  UsuarioLoginSchema,
} from 'src/schema/login.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsuarioLoginSchema.name,
        schema: LoginUsuarioLoginSchema,
      },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
