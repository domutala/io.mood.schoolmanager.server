/**
 * @author domutala
 *
 * @description
 * Ce modèle contient les informations d'un établissement scolaire
 */

import * as moment from "moment";

import functions from "../functions";
import utils from "../../utils";

export interface School {
  // details
  name: string;
  abbreviation?: string;
  logo?: string;
  slogan?: string;
  description?: string;
  created_date?: Date;

  // informations academiques
  ministere?: string;
  ia?: string;
  ief?: string;
  iden?: string;
  type?: string;
  language_main?: string;
  language_others?: string[];

  // contacts
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export const build = async (school: School, data: any) => {
  // await verify.logo(data.logo, unit.id.toString());

  verify.name(data.name);
  verify.created_date(data.created_date);
  verify.language_main(data.language_others);
  verify.language_others(data.language_others);
  verify.type(data.type);

  school.name = data.namr || school.name;
  school.abbreviation = data.abbreviation || school.name;
  school.logo = data.logo || school.name;
  school.slogan = data.slogan || school.name;
  school.description = data.description || school.name;
  school.created_date = data.created_date || school.created_date;

  // informations academiques
  school.ministere = data.ministere || school.ministere;
  school.ia = data.ia || school.ia;
  school.ief = data.ief || school.ief;
  school.iden = data.iden || school.iden;
  school.type = data.type || school.type;
  school.language_main = data.language_main || school.language_main;
  school.language_others = data.language_others || school.language_others;

  // contacts
  school.email = data.email || school.email;
  school.phone = data.phone || school.phone;
  school.address = data.address || school.address;
  school.website = data.website || school.website;
  school.facebook = data.facebook || school.facebook;
  school.twitter = data.twitter || school.twitter;
  school.linkedin = data.linkedin || school.linkedin;

  return school;
};

const verify_lang = (lang: string) => {
  const langs = [
    "français",
    "anglais",
    "arabe",
    "espagnol",
    "russe",
    "italien",
    "autres",
  ];

  if (!lang && !langs.includes(lang)) {
    const error = Error();
    error.name = "invalidData";
    error.message = "La langue indiquée pour l'objet School n'est pas valide";
    throw error;
  }
};

export const verify = {
  name: (name: string) => {
    if (name && !utils.regex.name(name)) {
      const error = Error();
      error.name = "invalidData";
      error.message = "Le nom de l'objet de School n'est pas valide";
      throw error;
    }
  },
  logo: async (unit_id: string, file_id?: string) => {
    if (file_id) {
      const file = await functions.file.find({ id: file_id });

      if (!file || file.unit !== unit_id) {
        const error = Error();
        error.name = "notFileFound";
        error.message =
          "Aucun fichier trouver dans le répertoire l'objet de School.";
        throw error;
      }
    }
  },
  created_date: (date?: Date) => {
    if (date && !moment(date).isValid()) {
      const error = Error();
      error.name = "invalidData";
      error.message =
        "Le date de création de l'objet de School n'est pas valide";
      throw error;
    }
  },

  language_main: (lang: string) => {
    if (lang) verify_lang(lang);
  },
  language_others: (langs: string[]) => {
    for (const lang of langs) {
      verify_lang(lang);
    }
  },

  type: (type: string) => {
    const langs = [
      "enseignement général",
      "enseignement technique",
      "franco-arabe",
      "bilingue",
      "autres",
    ];

    if (!type && !langs.includes(type)) {
      const error = Error();
      error.name = "invalidData";
      error.message = "La type indiqué pour l'objet School n'est pas valide";
      throw error;
    }
  },
};
