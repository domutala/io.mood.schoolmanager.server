import * as TokenGenerator from "uuid-token-generator";

export const generate_0 = (
  {
    size = 256,
    encoding = TokenGenerator.BASE16,
  }: { size?: number; encoding?: string } = {
    size: 256,
    encoding: TokenGenerator.BASE16,
  }
) => {
  const token = new TokenGenerator(size, encoding);
  return token.generate();
};

export const generate_1 = (
  { length = 50 }: { length?: number } = { length: 50 }
) => {
  let random = Math.random().toString();

  random = random.split(".")[1];
  random = random.slice(0, length);

  return random;
};

export default { generate_0, generate_1 };
