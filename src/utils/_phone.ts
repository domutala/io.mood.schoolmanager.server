import * as libphonenumber from "libphonenumber-js";

export const is_valid = (phone_number?: string) => {
  try {
    if (!phone_number) return false;

    const e = libphonenumber.parsePhoneNumber(phone_number);
    return e.isValid();
  } catch (error) {
    return false;
  }
};

export const country_code = (phone_number: string) => {
  try {
    const e = libphonenumber.parsePhoneNumber(phone_number);
    return e.isValid() ? e.countryCallingCode.toString() : undefined;
  } catch (error) {
    return undefined;
  }
};

export const format = (phone_number: string, international = false) => {
  try {
    const e = libphonenumber.parsePhoneNumber(phone_number);

    if (!e.isValid()) {
      return "";
    }

    if (international) {
      return e.formatInternational();
    }

    return e.formatNational();
  } catch (error) {
    return "";
  }
};

export default { is_valid, country_code, format };
