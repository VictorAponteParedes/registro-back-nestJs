import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistroController } from '../controllers/registro.controller';
import { RegistroService } from '../services/registro.service';

import {
  RegistroUsuarioSchema,
  UsuarioRegistroSchema,
} from 'src/schema/registro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsuarioRegistroSchema.name,
        schema: RegistroUsuarioSchema,
      },
    ]),
  ],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
