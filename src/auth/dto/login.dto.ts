export class CreateLoginUsuarioDto {
  correo: string;
  contrasena: string;
}

export class UpdateLoginUsuarioDto {
  correo?: string;
  contrasena?: string;
}
