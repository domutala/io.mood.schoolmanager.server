import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * cette table contient les information de connection du client.
 * @author domutala
 * @version 0.2.0
 */
@Entity()
export class Session extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  /** id de l'utilisateur connecté à la session */
  @Column({ type: "text", nullable: true })
  user?: string;

  /** C'est la clé publique du client de la session */
  @Column({ type: "text" })
  public_key!: string;

  @Column({ type: "boolean", default: false })
  expired!: boolean;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
