import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Access } from "../models/Access";
import { UnitDate, UnitType } from "../models/Unit";

/**
 * @author domutala
 *
 * @description
 * A part les objets de type `Session`, `File` ou `User`, tous les autres
 * données sont enregistrées dans un seul objet dénommé **`Unit`**. Un `Unit`
 * peut donc contenir des données de natures diverses.
 */
@Entity()
export class Unit extends BaseEntity {
  /** C'est l'identifiant de l'object */
  @ObjectIdColumn()
  id!: ObjectID;

  /**
   * C'est l'identifiant de l'object parent, Pour les objets de type `School`
   * sa valeur peut être `null`.
   */
  @Column({ type: "string", nullable: true })
  parent?: string;

  /** Explication plus tard dans ce document*/
  @Column({ type: "string" })
  type!: UnitType;

  /** C'est la valeur de l'objet */
  @Column()
  data!: UnitDate;

  /**
   * C'est un tableau d'accès permettant au utilisateur d'effetuer
   * des taches précises.
   */
  @Column({ type: "array" })
  access!: Access[];

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
