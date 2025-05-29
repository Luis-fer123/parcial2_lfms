import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Pais } from './entities/paise.entity';
import { CreatePaisDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const existePais = await this.paisRepository.findOneBy({
      descripcion: createPaisDto.descripcion.trim(),
    });
    if (existePais) {
      throw new ConflictException('El país ya está registrado');
    }

    const pais = this.paisRepository.create({
      descripcion: createPaisDto.descripcion.trim(),
    });

    return this.paisRepository.save(pais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOneBy({ id });
    if (!pais) {
      throw new NotFoundException('El país no existe');
    }
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaiseDto): Promise<Pais> {
    const pais = await this.findOne(id);

    if (updatePaisDto.descripcion !== undefined) {
      const existePais = await this.paisRepository.findOne({
        where: {
          descripcion: updatePaisDto.descripcion.trim(),
          id: Not(id),
        },
      });
      if (existePais) {
        throw new ConflictException(
          'El país ya está registrado con esa descripción',
        );
      }

      pais.descripcion = updatePaisDto.descripcion.trim();
    }

    return this.paisRepository.save(pais);
  }

  async remove(id: number): Promise<void> {
    const pais = await this.findOne(id);
    await this.paisRepository.softRemove(pais);
  }
}
