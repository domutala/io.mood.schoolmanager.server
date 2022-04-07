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
 * Pour accéder à une informations l'utilisateur a
 * besoin d'avoir une autorisation d'accès à cette donnée.
 * @author domutala
 * @version 0.2.0
 */
@Entity()
export class Access extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  /** C'est l'identifiant de l'objet user */
  @Column({ nullable: true })
  user!: string;

  @Column({ nullable: true })
  object!: {
    /** C'est l'identifiant de l'objet */ id: string;
    /** C'est le type objet: school, classroom, year, ... */ types: string;
  };

  /**
   * admin: donne tous les accès possible, suppression et
   *        ajout de nouvelle accès.
   *
   * write: permet une modification de l'objet.
   *
   * read: c'est un accès en lecture simple.
   */
  @Column({ type: "text" })
  role!: "admin" | "read" | "write";

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
