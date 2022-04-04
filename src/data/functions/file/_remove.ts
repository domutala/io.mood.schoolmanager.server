import funcs from ".";

/**
 * @author domutala
 */
export default async (id: string) => {
  const file = await funcs.find({ id });
  if (!file) return "notFileFound";

  await file.remove();

  return true;
};
