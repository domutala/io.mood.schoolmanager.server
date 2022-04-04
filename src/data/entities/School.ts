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
 * @author domutala
 * @version 0.2.0
 */
@Entity()
export class School extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column({ nullable: true })
  name!: string;

  /** pointe vers un file id_file */
  @Column({ type: "text", nullable: true })
  logo?: string;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
