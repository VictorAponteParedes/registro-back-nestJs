export class CreateRegistroUsuarioDto {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  imagen?: any;
}

export class UpdateRegistroUsuarioDto {
  nombre?: string;
  apellido?: string;
  correo?: string;
  contrasena?: string;
  imagen?: any;
}
