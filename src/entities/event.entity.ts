import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { ConsentType } from 'shared/consent-type';
import { User } from './user.entity';

export type EventData = { type: ConsentType; enabled: boolean };

@Entity('events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @Column({
    type: 'jsonb',
  })
  consents: EventData[];

  @ManyToOne(() => User, (user) => user.consents, { onDelete: 'CASCADE' })
  user: User;
}
