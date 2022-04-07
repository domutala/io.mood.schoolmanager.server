import { School } from "./School";
import { Year } from "./Year";

const unit_types = ["school", "year", "classroom", "student"] as const;
export type UnitType = typeof unit_types[number];
export const isUnitType = (x: any): x is UnitType => unit_types.includes(x);

export type UnitDate = School | Year;
