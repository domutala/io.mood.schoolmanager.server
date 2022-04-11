(async () => {
  try {
    const ob: { [key: string]: any } = {
      a: {
        b: {
          c: 0,
        },
      },
    };
    const keys = "a.b.c";
    console.log(ob[keys]);

    for (const key of keys.split(".")) {
      console.log(key);
    }
  } catch (error) {
    console.log((error as Error).name);
    console.log(error);
  }
})();
