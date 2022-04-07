(async () => {
  try {
    const fruit = ["apple", "banana", "grape"] as const;
    type Fruit = typeof fruit[number];
    const isFruit = (x: any): x is Fruit => fruit.includes(x);

    const myfruit = "pear";
    console.log(isFruit(myfruit));

    if (isFruit(myfruit)) {
      console.log("My fruit is of type 'Fruit'");
    }
  } catch (error) {
    console.log((error as Error).name);
    console.log(error);
  }
})();
