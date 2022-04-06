import { School } from "../../entities/School";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel objet School
 * @version 0.2.0
 */
export default async ({ name, user_id }: { name: string; user_id: string }) => {
  // vérifier si les données sont correctes
  await functions.school.utils.test_data({ name, user_id });

  const school = new School();
  school.name = name;
  school.user = user_id;
  school.academic_informations = {};
  school.contacts = {};

  await school.save();

  return school;
};
