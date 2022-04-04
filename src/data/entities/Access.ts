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

  /** C'est l'identifiant de l'utilisateur */
  @Column({ nullable: true })
  user!: string;

  /** C'est l'identifiant de l'élément auquel l'utilisateur a accès */
  @Column({ nullable: true })
  element!: { id: string };

  /**
   * Chaque acces attribut un role bien défini.
   * Par exemple s'agissant d'une classe l'utilisateur
   * peut u accéder en tant que surveillant, professeur ou directeur.
   */
  @Column({ type: "text", nullable: true })
  role?: string;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
