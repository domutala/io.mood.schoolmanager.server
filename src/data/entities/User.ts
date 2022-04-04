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
 * cette table contient les information de l'utilisateur.
 * @author domutala
 * @version 0.2.0
 */
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column({ nullable: true })
  name?: { first: string; last?: string };

  /** pointe vers un file id_file */
  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "text", nullable: true })
  phone?: string;

  @Column({ type: "text", nullable: true })
  email!: string;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
