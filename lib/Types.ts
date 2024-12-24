export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};



export type PricingType = {
  hour:string,
  days:string[],
  week:string,
  month:string
}