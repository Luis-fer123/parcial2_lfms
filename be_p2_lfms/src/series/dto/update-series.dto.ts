import { PartialType } from '@nestjs/swagger';
import { CreateSerieDto } from './create-series.dto';

export class UpdateSeriesDto extends PartialType(CreateSerieDto) {}
