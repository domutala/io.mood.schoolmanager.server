import firebase_admin from "firebase-admin";
import { Session } from "../../../data/entities/Session";
import data from "../../../data";

export default async ({
  session,
  firebase_id_token,
}: {
  session: Session;
  firebase_id_token: string;
}) => {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);

  if (!firebase_admin.apps.length) {
    firebase_admin.initializeApp({
      credential: firebase_admin.credential.cert(serviceAccount),
    });
  }

  const verify_token = await firebase_admin
    .auth()
    .verifyIdToken(firebase_id_token);

  if (!verify_token) throw { text: "firebaseTokenError" };

  const body = await firebase_admin.auth().getUser(verify_token.uid);
  if (!body.email) throw { text: "emailIsRequired" };

  let user = await data.functions.user.find({ email: body.email });

  if (!user) {
    const name = { first: "", last: "" };
    if (body.displayName) {
      const n = body.displayName.split(" ");

      if (n.length === 1) name.first = body.displayName;
      else {
        name.first = n.slice(0, n.length - 1).join(" ");
        name.last = n.slice(n.length - 1).join(" ");
      }
    }

    user = await data.functions.user.add({
      email: body.email,
      name,
      phone: body.phoneNumber,
    });
  }

  await data.functions.session.update({
    id: session.id.toString(),
    user_id: user.id.toString(),
  });

  return true;
};
