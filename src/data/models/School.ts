/**
 * @author domutala
 *
 * @description
 * Ce modèle contient les informations d'un établissement scolaire
 */

export interface School {
  details: {
    name: string;
    abbreviation?: string;
    logo?: string;
    slogan?: string;
    description?: string;
    created_date?: Date;
  };

  academic_informations: {
    ministere?: string;
    ia?: string;
    ief?: string;
    iden?: string;
    type?: string;
    language?: { main: string; others: string[] };
  };

  contacts: {
    email?: string;
    phone?: string;
    address?: string;
    web_site?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}
