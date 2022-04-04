const send = async (text: string) => {
  text = `sms: ${text}`;

  console.log(text);
};

export default { send };
