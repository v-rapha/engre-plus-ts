import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee';

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

  @ManyToOne(() => Employee, employee => employee.sales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;
}
