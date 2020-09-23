import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  client!: string;

  @Column()
  description!: string;

  @Column('float')
  price!: number;

  @Column('int')
  initial_date!: number;

  @Column('int')
  final_date!: number;
}
