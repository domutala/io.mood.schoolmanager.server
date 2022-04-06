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

  /** pointe vers un file id_file  */
  @Column({ type: "text", nullable: true })
  logo?: string;

  @Column({ type: "text", nullable: true })
  abbreviation?: string;

  @Column({ type: "text", nullable: true })
  slogan?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "date", nullable: true })
  created_date?: Date;

  @Column()
  academic_informations!: {
    ministere?: string;
    ia?: string;
    ief?: string;
    iden?: string;
    type?: string;
    language?: { main: string; others: string[] };
  };

  @Column()
  contacts!: {
    email?: string;
    phone?: string;
    address?: string;
    web_site?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };

  /** id de l'utilisateur qui a créer l'objet */
  @Column({ type: "text" })
  user!: string;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
