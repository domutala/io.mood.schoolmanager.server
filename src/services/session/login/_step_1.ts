import { Session } from "../../../data/entities/Session";
import utils from "../../../utils";
import data from "../../../data";

/**
 * @name login_step_1
 * @author domutala
 * @description initialiser un nouvelle session
 * @version 0.2.0
 */
export default async ({
  session_id,
  public_key,
}: {
  session_id?: string;
  public_key: string;
}) => {
  const server_public_key = utils.rsa.get().public_key;
  if (public_key) public_key = public_key.replace(/--n--/gm, "\n");

  let session: Session | undefined;

  // vérifier si la session est déjà initialisé
  if (session_id) {
    session = await data.functions.session.find({ id: session_id });
  }

  // vérifier si la session n'est pas expirée
  if (!session || session.expired) {
    // créer un nouvelle session
    session = await data.functions.session.add({ public_key });
  }

  return { session_id: session.id.toString(), public_key: server_public_key };
};
