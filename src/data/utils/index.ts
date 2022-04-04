import functions from "../functions";

const verify_ni = async (
  ni: Array<{
    type: string;
    numero: string;
    files: string[];
  }>,
  user: string
) => {
  for (const n of ni) {
    if (!n.numero || !n.numero || !n.files.length) return false;

    for (const file of n.files) {
      const f = await functions.file.find({ id: file });
      if (!f) return false;

      if (f.user !== user) return false;
    }
  }

  return true;
};

export default { verify_ni };
