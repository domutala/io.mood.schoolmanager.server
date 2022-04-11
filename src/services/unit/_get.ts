import { ISession } from "../../../types/express-extend";
import data from "../../data";

/**
 * Trouver des objet de type `Unit` en fonction de l'objet `User`
 *
 * @author domutala
 * @description Ajouter un objet School
 * @version 0.2.0
 */
export default async ({
  session,
  parent,
  id,
  types,
}: {
  session: ISession;
  id?: string;
  parent?: string;
  types?: string[];
}) => {
  const unit = await data.functions.unit.find({
    user: session._user as any,
    id,
    parent,
    types,
  });

  return unit;
};
