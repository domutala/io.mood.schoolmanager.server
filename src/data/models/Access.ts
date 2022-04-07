/**
 * @author domutala
 *
 * @description
 * Pour accéder à une informations l'utilisateur a
 * besoin d'avoir une autorisation d'accès à cette donnée.
 */
export interface Access {
  /** C'est l'identifiant de l'objet user */
  user: string;

  /**
   * admin:
   *  - donne tous les accès possible;
   *  - Suppression et ajout de nouvelle accès.
   *
   * write: permet une modification de l'objet.
   *
   * read: c'est un accès en lecture simple.
   */
  role: "admin" | "read" | "write";

  /** L'utilisateur qui posséde l'objet */
  owner: string;
}
