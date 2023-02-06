import { SelectOption } from "./../components/Select/Select";
import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const space = {
  none: 0,
  small: "5px",
  medium: "10px",
  large: "20px",
  em2: "2em",
};

const fontfamily = {
  Alegreya: "Alegreya",
  Cantarell: "Cantarell",
  Lato: "Lato",
  MedievalSharp: "MedievalSharp",
  Merriweather: "Merriweather",
  Oxanium: "Oxanium",
  Quattrocento: "Quattrocento",
};

export const themeVars = createThemeContract({
  color: {
    background: "",
    backgroundSecondary: "",
    accent: "",
    primary: "",
    secondary: "",
    none: "transparent",
  },
  font: {
    family: "",
    size: {
      small: "10px",
      smaller: "13px",
      standard: "15px",
      bigger: "17px",
      big: "20px",
    },
  },
});

export const themeProperties = defineProperties({
  properties: {
    display: ["none", "flex", "inline", "block"],
    flexDirection: ["row", "column"],
    justifyContent: ["center", "flex-end", "flex-start", "space-between"],
    alignItems: ["center", "flex-start", "flex-end"],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    gap: space,
    fontSize: themeVars.font.size,
    borderRadius: space,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: themeVars.color,
    backgroundColor: themeVars.color,
  },
});

export const sprinkles = createSprinkles(themeProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];

export const baseStyle = style([
  sprinkles({
    fontSize: "standard",
  }),
  {
    fontFamily: themeVars.font.family,
  },
]);

export const darksandThemeClass = createTheme(themeVars, {
  color: {
    background: "#3B2300",
    backgroundSecondary: "#724C13",
    accent: "#AA7C39",
    primary: "#fff",
    secondary: "#FFDCA9",
    none: "transparent",
  },
  font: {
    family: fontfamily.Quattrocento,
    size: {
      small: "11px",
      smaller: "14px",
      standard: "16px",
      bigger: "18px",
      big: "21px",
    },
  },
});

export const darkblueThemeClass = createTheme(themeVars, {
  color: {
    background: "#21526B",
    backgroundSecondary: "#398DB8",
    accent: "#415D6B",
    primary: "#fff",
    secondary: "#91CFEE",
    none: "transparent",
  },
  font: {
    family: fontfamily.Cantarell,
    size: {
      small: "11px",
      smaller: "14px",
      standard: "16px",
      bigger: "18px",
      big: "21px",
    },
  },
});

export const themeList: SelectOption[] = [
  { label: "Dark sand", value: "darksand" },
  { label: "Dark blue", value: "darkblue" },
];

export const themeMap: Record<string, string> = {
  darksand: darksandThemeClass,
  darkblue: darkblueThemeClass,
};

// const bluePalette = {
//   dark: {
//     background: "#21526B",
//     backgroundSecondary: "#398DB8",
//     accent: "#415D6B",
//     primary: "#fff",
//     secondary: "#91CFEE",
//   },
//   light: {
//     background: "#91CFEE",
//     backgroundSecondary: "#4AB4EB",
//     accent: "#398DB8",
//     primary: "#000",
//     secondary: "#fff",
//   },
// };

// const sandPalette = {
//   dark: {
//     background: "#3B2300",
//     backgroundSecondary: "#724C13",
//     accent: "#AA7C39",
//     primary: "#fff",
//     secondary: "#FFDCA9",
//   },
//   light: {
//     background: "#FFDCA9",
//     backgroundSecondary: "#E2B370",
//     accent: "#724C13",
//     primary: "#000",
//     secondary: "#3B2300",
//   },
// };

// export const [darkThemeClass, darkThemeVars] = createTheme({
//   color: sandPalette.dark,
//   font: {
//     family: "Cantarell",
//     size: themeFontSizes,
//   },
// });

// export const [lightThemeClass, lightThemeVars] = createTheme({
//   color: sandPalette.light,
//   font: {
//     family: "Oxanium",
//     size: themeFontSizes,
//   },
// });

// export const drawColors = {
//   yellow: "#f2f230",
//   pink: "#e949f5",
//   green: "#0fff50",
//   blue: "#3f99ff",
//   red: "#ff1818",
// };

// // export const runtimeColors = {
// //   yellow: "#f2f230",
// //   pink: "#e949f5",
// //   neonpink: "#ff00ff",
// //   green: "#0fff50",
// //   neongreen: "#00ff00",
// //   darkblue: "#2c84fa",
// //   blue: "#3f99ff",
// //   neonblue: "#00ffff",
// //   red: "#ff1818",
// //   fontPrimary: "#ffffff",
// //   background: "#27262b",
// //   background100: "#080c12",
// //   background100a70: "#080c1270",
// //   background100aee: "#080c12ef",
// //   background200: "#12171d",
// //   background300: "#567091",
// // };

// // export const [themeClass, themeVars] = createTheme({
// //   fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
// //   fontSizes: {
// //     small: "13px",
// //     standard: "15px",
// //     bigger: "18px",
// //     large: "20px",
// //   },
// //   colors: {
// //     yellow: "#f2f230",
// //     pink: "#e949f5",
// //     neonpink: "#ff00ff",
// //     green: "#0fff50",
// //     neongreen: "#00ff00",
// //     darkblue: "#2c84fa",
// //     blue: "#3f99ff",
// //     neonblue: "#00ffff",
// //     red: "#ff1818",
// //     fontPrimary: "#ffffff",
// //     background: "#27262b",
// //     background100: "#080c12",
// //     background100a70: "#080c1270",
// //     background100aee: "#080c12ef",
// //     background200: "#12171d",
// //     background300: "#567091",
// //   },
// // });

// // export const runtime = {
// //   fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
// //   fontSizes: {
// //     small: "13px",
// //     standard: "15px",
// //     bigger: "18px",
// //     large: "20px",
// //   },
// //   colors: {
// //     yellow: "#f2f230",
// //     pink: "#e949f5",
// //     neonpink: "#ff00ff",
// //     green: "#0fff50",
// //     neongreen: "#00ff00",
// //     darkblue: "#2c84fa",
// //     blue: "#3f99ff",
// //     neonblue: "#00ffff",
// //     red: "#ff1818",
// //     fontPrimary: "#ffffff",
// //     background: "#27262b",
// //     background100: "#080c12",
// //     background100a70: "#080c1270",
// //     background100aee: "#080c12ef",
// //     background200: "#12171d",
// //     background300: "#567091",
// //   },
// // };
