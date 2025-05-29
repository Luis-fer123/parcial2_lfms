import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePaisDto {
  @ApiProperty({ example: ' ' })
  @IsNotEmpty({ message: 'El campo descripcion es requerido' })
  @IsString({ message: 'El campo descripcion debe ser una cadena de texto' })
  @MaxLength(30, {
    message: 'El campo descripcion no debe exceder los 30 caracteres',
  })
  readonly descripcion: string;
}
