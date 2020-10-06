import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AuthService from '../../services/auth';

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await AuthService.hashPassword(this.password);
  }
}
