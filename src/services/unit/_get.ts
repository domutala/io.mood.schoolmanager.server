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
}: {
  session: ISession;
  parent?: string;
}) => {
  const unit = await data.functions.unit.find({
    user: session._user as any,
    parent,
  });

  return unit;
};
