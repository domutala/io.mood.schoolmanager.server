import * as moment from "moment";
import { School } from "../../../models/School";
import utils from "../../../../utils";
import functions from "../..";

/**
 * @author domutala
 * @version 0.2.0
 */
const verify_data = async (school: School) => {
  if (school.details) {
    if (school.details.name && !utils.regex.name(school.details.name)) {
      const error = Error();
      error.name = "invalidData";
      error.message =
        "Le nom de School(etablissement scolaire) n'est pas valide";
      throw error;
    }

    // véerifier la date de création
    if (
      school.details.created_date &&
      !moment(school.details.created_date).isValid()
    ) {
      const error = Error();
      error.name = "invalidData";
      error.message =
        "La date de création de School(etablissement scolaire) n'est pas valide";
      throw error;
    }

    if (school.details.logo) {
      const file = await functions.file.find({ id: school.details.logo });

      if (!file) {
        const error = Error();
        error.name = "notFoundData";
        error.message =
          "Le fichier du logo de l'objet School(etablissement scolaire) est introuvable";
        throw error;
      }
    }
  }

  // vérifier les informations académiques
  if (school.academic_informations) {
    // vérifier le type
    const accepted_types = [
      "enseignement général",
      "enseignement technique",
      "franco-arabe",
      "bilingue",
      "autres",
    ];

    if (school.academic_informations.type) {
      const type = school.academic_informations.type;

      if (!accepted_types.includes(type)) {
        const error = Error();
        error.name = "invalidData";
        error.message = `${type} n'est pas un type que vous pouvez utiliser pour un objet School(etablissement scolaire).`;
        throw error;
      }
    }

    // vérifier les langue d'enseignement
    const accepted_languages = [
      "français",
      "anglais",
      "arabe",
      "espagnol",
      "russe",
      "italien",
      "autres",
    ];

    if (school.academic_informations.language) {
      // vérifier si langue principale est valide
      const l_main = school.academic_informations.language.main;
      if (!accepted_languages.includes(l_main)) {
        const error = Error();
        error.name = "invalidData";
        error.message = `La langue d'enseignement principale de l'objet School(etablissement scolaire) n'est pas valide. ${l_main} n'est pas une langue que vous pouvez utiliser.`;
        throw error;
      }

      // vérifier les langue secondaire
      const others = school.academic_informations.language.others;
      if (others) {
        // vérifier le types de others
        if (!Array.isArray(others)) {
          const error = Error();
          error.name = "invalidData";
          error.message = `Les autres langues d'enseignement de l'objet School(etablissement scolaire) ne sont pas valide.`;
          throw error;
        }

        for (const other of others) {
          if (!accepted_languages.includes(other)) {
            const error = Error();
            error.name = "invalidData";
            error.message = `${other} n'est pas une langue que vous pouvez utiliser pour un objet School(etablissement scolaire).`;
            throw error;
          }
        }
      }
    }
  }

  return true;
};

export default { verify_data };
