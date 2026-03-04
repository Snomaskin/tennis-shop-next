type wpAboutSection = {
  [sectionName: string]: {
    [fieldName: string]: string;
  };
};

type AboutResponse = {
  acf: {
    about: wpAboutSection;
  };
};

type AboutSection = {
  section: string;
  fields: {
    name: string;
    value: string;
  }[];
};

export type { wpAboutSection, AboutResponse, AboutSection };
