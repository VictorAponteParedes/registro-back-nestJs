import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { RegistroService } from '../services/registro.service';
import { CreateRegistroUsuarioDto } from '../dto/registro.dto/registro.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { diskStorage } from 'multer';

@Controller('registro')
export class RegistroController {
  constructor(private registroUsuarioService: RegistroService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: '../uploads',
      }),
    }),
  )
  async postRegistroUsuario(
    @Body() body: CreateRegistroUsuarioDto,
    @UploadedFile() imagenFile: Express.Multer.File,
  ) {
    try {
      console.log('req:', body.imagen);
      console.log('Imagen recibida:', imagenFile);

      if (!body.contrasena) {
        throw new BadRequestException('La contraseña es obligatoria');
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(body.contrasena, saltOrRounds);
      const imagenBody = body.imagen;

      const usuarioData = {
        ...body,

        contrasena: hashedPassword,
        imagen: imagenBody,
      };

      const result =
        await this.registroUsuarioService.createRegistroUsuario(usuarioData);

      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Usuario ya existe');
      }
      console.error('Error durante el registro:', e);
      throw e;
    }
  }

  @Get()
  getAllUsuarios() {
    const usuarios = this.registroUsuarioService.getAllRegistroUsuario();
    return usuarios;
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: string) {
    try {
      const usuario = await this.registroUsuarioService.getRegistroUsuario(id);
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuario no encontrado.');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUsuarioRegistrado(@Param('id') id: string) {
    const usuario = this.registroUsuarioService.deleteUsuario(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }

  @Put(':id')
  async actulizarUsuarioRegistro(
    @Param('id') id: string,
    @Body() body: CreateRegistroUsuarioDto,
  ) {
    const usuario = this.registroUsuarioService.updateUsuario(id, body);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }
}
