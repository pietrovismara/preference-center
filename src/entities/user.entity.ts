import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consent } from './consent.entity';
import { Event } from './event.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;

  @Column({
    name: 'email',
    nullable: false,
    type: 'varchar',
    length: 500,
    unique: true,
  })
  email: string;

  @OneToMany(() => Consent, (consent) => consent.user, { cascade: true })
  consents: Consent[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
