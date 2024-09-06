export interface ILanguage {
  code: string;
  name: string;
  country_code: string;
  dir: string;
}

export const languageList: Array<ILanguage> = [
  {
    code: "fa",
    name: "فارسی",
    country_code: "fa",
    dir: "rtl",
  },
  {
    code: "en",
    name: "English(US)",
    country_code: "gb",
    dir: "ltr",
  },
];
