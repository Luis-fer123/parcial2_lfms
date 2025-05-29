import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/series.entity';
import { Pais } from 'src/paises/entities/paise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie, Pais])],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [TypeOrmModule],
})
export class SeriesModule {}
