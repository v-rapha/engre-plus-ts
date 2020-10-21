import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AuthService from '../services/auth';
import { Sale } from './Sale';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Sale, sale => sale.employee, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'employee_id' })
  sales!: Sale[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await AuthService.hashPassword(this.password);
  }
}
