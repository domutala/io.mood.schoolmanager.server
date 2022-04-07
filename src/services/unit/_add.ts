import { ISession } from "../../../types/express-extend";
import data from "../../data";

/**
 * Cette fonction permet d'ajouter un objet de type Unit dans
 * la base de données.
 *
 * @author domutala
 * @description Ajouter un objet School
 * @version 0.2.0
 */
export default async ({ session, body }: { session: ISession; body: any }) => {
  const unit = await data.functions.unit.add({
    user: session._user,
    ...body,
  });

  return unit;
};
