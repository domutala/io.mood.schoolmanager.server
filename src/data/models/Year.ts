/**
 * @author domutala
 *
 * @description
 * Il contient les information d'une année scolaire
 */
export interface Year {
  name: string;

  /**Date de début de l'année scolaire */
  start_date: Date;

  /** Date de fin de l'année scolaire */
  end_at: Date;
}
