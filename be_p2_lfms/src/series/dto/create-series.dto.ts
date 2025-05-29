import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateSerieDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo idpais es requerido' })
  @IsInt({ message: 'El campo id_pais debe ser un número entero' })
  readonly idpais: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo titulo es requerido' })
  @IsString({ message: 'El campo titulo debe ser una cadena de texto' })
  @MaxLength(250, {
    message: 'El campo titulo no debe exceder los 250 caracteres',
  })
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis es requerido' })
  @IsString({ message: 'El campo sinopsis debe ser una cadena de texto' })
  @MaxLength(5000, {
    message: 'El campo sinopsis no debe exceder los 5000 caracteres',
  })
  readonly sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director es requerido' })
  @IsString({ message: 'El campo director debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El campo director no debe exceder los 100 caracteres',
  })
  readonly director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo temporadas es requerido' })
  @IsInt({ message: 'El campo temporadas debe ser un número entero' })
  @Min(1, { message: 'Debe haber al menos una temporada' })
  readonly temporadas: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fecha_estreno es requerido' })
  @IsDateString(
    {},
    {
      message:
        'El campo fecha_estreno debe tener formato de fecha válida (YYYY-MM-DD)',
    },
  )
  readonly fechaEstreno: string;
}
