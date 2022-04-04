import * as fs from "fs";
import * as nodersa from "node-rsa";

const get = () => {
  const RSA_KEYS = JSON.parse(process.env.RSA_KEYS as string);
  return RSA_KEYS as { public_key: string; private_key: string };
};

const generate = () => {
  let public_key = fs.readFileSync("public_key.pem", "utf8");
  let private_key = fs.readFileSync("private_key.pem", "utf8");

  if (!public_key || !private_key) {
    const crypto = new nodersa({ b: 512 });
    const keys = crypto.generateKeyPair();

    public_key = keys.exportKey("pkcs8-public-pem");
    private_key = keys.exportKey("pkcs8-private-pem");

    fs.writeFileSync("public_key.pem", public_key);
    fs.writeFileSync("private_key.pem", private_key);
  }

  return { public_key, private_key };
};

const encrypter = ({
  key,
  data,
}: {
  key?: string;
  data: string | number[];
}) => {
  if (!key) key = get().public_key;

  const max_length = 86;

  if (typeof data === "string" && data.length > max_length) {
    const datas: string[] = [];

    for (let i = 0; i < data.length; i += max_length) {
      const dt = data.slice(i, i + max_length);
      const enc = encrypter({ key, data: dt });
      datas.push(enc as string);
    }

    return datas;
  }

  const _key = new nodersa({ b: 512 });
  _key.importKey(key, "pkcs8-public-pem");
  // const enc = _key.encrypt(Buffer.from(data), "buffer");
  // const enc = crypto.publicEncrypt(key, Buffer.from(data));

  // return enc.toJSON().data;

  const enc = _key.encrypt(Buffer.from(data), "base64");
  return enc;
};

const decrypter = ({
  key,
  data,
}: {
  key?: string;
  data: string | string[];
}) => {
  if (!key) key = get().private_key;

  if (Array.isArray(data)) {
    let datas = "";

    for (const dt of data) datas += decrypter({ key, data: dt });

    return datas;
  }

  const _key = new nodersa({ b: 512 });
  _key.importKey(key, "pkcs8-private-pem");

  const dec = _key.decrypt(data, "utf8");
  return dec;
};

export default { generate, encrypter, decrypter, get };
