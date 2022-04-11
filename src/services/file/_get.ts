import data from "../../data";

export default async ({ file_id }: { file_id: string }) => {
  const file = await data.functions.file.find({ id: file_id });
  return file;
};
