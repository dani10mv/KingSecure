export interface Dispositivo
{
  nombre?: string;
  estado: string;
  codigo: number;//inicialmente les asignamos un codigo unico para cada dispositivo de esta forma se podria rastrear un dispositivo en concreto
  asignado:boolean;



 }
