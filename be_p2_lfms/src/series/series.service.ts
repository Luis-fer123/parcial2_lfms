import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/series.entity';
import { CreateSerieDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Pais } from 'src/paises/entities/paise.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private readonly seriesRepository: Repository<Serie>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    const pais = await this.paisRepository.findOne({
      where: { id: createSerieDto.idpais },
    });

    if (!pais) {
      throw new ConflictException('El país especificado no existe');
    }

    const serie = this.seriesRepository.create({
      ...createSerieDto,
      pais,
      fechaEstreno: new Date(createSerieDto.fechaEstreno),
    });

    return this.seriesRepository.save(serie);
  }

  async findAll(): Promise<Serie[]> {
    return this.seriesRepository.find({ relations: ['pais'] });
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.seriesRepository.findOne({
      where: { id },
      relations: ['pais'],
    });

    if (!serie) {
      throw new NotFoundException('La serie no existe');
    }

    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSeriesDto): Promise<Serie> {
    const serie = await this.findOne(id);

    if (updateSerieDto.idpais) {
      const pais = await this.paisRepository.findOneBy({
        id: updateSerieDto.idpais,
      });
      if (!pais) {
        throw new ConflictException('El país especificado no existe');
      }
      serie.pais = pais;
    }

    if (updateSerieDto.titulo !== undefined) {
      serie.titulo = updateSerieDto.titulo.trim();
    }

    if (updateSerieDto.sinopsis !== undefined) {
      serie.sinopsis = updateSerieDto.sinopsis.trim();
    }

    if (updateSerieDto.director !== undefined) {
      serie.director = updateSerieDto.director.trim();
    }

    if (updateSerieDto.temporadas !== undefined) {
      serie.temporadas = updateSerieDto.temporadas;
    }

    if (updateSerieDto.fechaEstreno !== undefined) {
      serie.fechaEstreno = new Date(updateSerieDto.fechaEstreno);
    }

    return this.seriesRepository.save(serie);
  }

  async remove(id: number): Promise<void> {
    const serie = await this.findOne(id);
    await this.seriesRepository.remove(serie);
  }
}
