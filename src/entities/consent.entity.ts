import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';

import { ConsentType } from 'shared/consent-type';
import { User } from './user.entity';

@Entity('consents')
@Unique(['type', 'user'])
export class Consent extends BaseEntity {
  static createConsentByType(type: ConsentType, enabled: boolean = false) {
    const consent = new Consent();
    consent.type = type;
    consent.enabled = false;
    return consent;
  }

  static createSmsConsent(enabled: boolean = false) {
    return Consent.createConsentByType(ConsentType.sms_notifications, enabled);
  }

  static createEmailConsent(enabled: boolean = false) {
    return Consent.createConsentByType(
      ConsentType.email_notifications,
      enabled,
    );
  }

  @PrimaryGeneratedColumn()
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
    type: 'enum',
    nullable: false,
    enum: ConsentType,
  })
  type: ConsentType;

  @Column({
    type: 'bool',
    nullable: false,
    default: false,
  })
  enabled: boolean;

  @ManyToOne(() => User, (user) => user.consents, {
    onDelete: 'CASCADE',
  })
  user: User;
}
