const mail = (mail?: string) => {
  if (!mail) return false;

  const r =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

  return r.test(mail);
};

const url = (url: string) => {
  const r =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g; // eslint-disable-line

  return r.test(url);
};

const time = (time: string) => {
  const r = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/g; // eslint-disable-line

  return r.test(time);
};

const name = (name?: string) => {
  if (!name || !name.length) return false;

  const r = /.{2,}/gm;
  const test = r.test(name);
  if (!test) return false;

  const r0 = /(^ )/gm;
  const test0 = r0.test(name);
  if (test0) return false;

  const r1 = /[a-zA-Z]+/gim;
  const test1 = r1.test(name);
  if (!test1) return false;

  const r2 = /\n/gim;
  const test2 = r2.test(name);
  if (test2) return false;

  return true;
};

const password = (password: string) => {
  const r0 = /\S/gm;
  const test0 = r0.test(password);
  if (!test0) return false;

  const r1 = /.{6,}/gim;
  const test1 = r1.test(password);
  if (!test1) return false;

  const r2 = /\n/gim;
  const test2 = r2.test(password);
  if (test2) return false;

  return true;
};

const username = (username: string) => {
  const r0 = /^([a-z0-98_.]){4,50}$/gm;
  const test0 = r0.test(username);
  if (!test0) return false;

  const r1 = /\n/gm;
  const test1 = r1.test(username);
  if (test1) return false;

  return true;
};

const pin = async (pin: string) => {
  const notBePin = [
    "0123",
    "1234",
    "2345",
    "3456",
    "4567",
    "5678",
    "6789",
    "0000",
    "1111",
    "2222",
    "3333",
    "4444",
    "5555",
    "6666",
    "7777",
    "8888",
    "9999",
  ];

  if (notBePin.includes(pin)) return false;
  if (notBePin.includes(pin.split("").reverse().join(""))) return false;
  if (pin.length !== 4) return false;

  return true;
};

export default { mail, url, time, name, password, username, pin };
