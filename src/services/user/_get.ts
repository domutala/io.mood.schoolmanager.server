import data from "../../data";

export default async ({ id, email }: { id?: string; email?: string }) => {
  const user = await data.functions.user.find({ id, email });

  return user;
};
