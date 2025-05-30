import { Pais } from 'src/paises/entities/paise.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Pais)
  @JoinColumn({ name: 'idpais' })
  pais: Pais;

  @Column('varchar', { length: 250 })
  titulo: string;

  @Column('varchar', { length: 5000 })
  sinopsis: string;

  @Column('varchar', { length: 100 })
  director: string;

  @Column('int')
  temporadas: number;

  @Column('date', { name: 'fecha_estreno' })
  fechaEstreno: Date;

  @Column('varchar', { length: 100, name: 'idiomaprincipal' })
  idiomaPrincipal: string;
}
