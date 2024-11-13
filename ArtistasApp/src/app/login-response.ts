export interface LoginResponse {
  access_token: string;
  token_type: string;
  id_rol: number; // Agregar id_rol para la validación del rol
  user_name: string; // Agregar el nombre de usuario para mostrar en el header
  user: {
    id_rol: number; // Para validar el rol del usuario en la respuesta
    nombre: string; // El nombre del usuario para cualquier referencia futura
  };
}
