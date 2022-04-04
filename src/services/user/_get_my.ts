import { Session } from "../../data/entities/Session";
import services from "..";

export default async ({ session }: { session: Session }) => {
  if (!session.user) return;

  const user = await services.user.get({ id: session.user });

  return user;
};
