import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  color: {
    background: "",
    backgroundSecondary: "",
    accent: "",
    primary: "",
    secondary: "",
  },
  font: {
    family: "",
    size: {
      standard: "",
      bigger: "",
      large: "",
      smaller: "",
      small: "",
    },
  },
});

const themeFontSizes = {
  standard: "17px",
  bigger: "19px",
  large: "21px",
  smaller: "15px",
  small: "13px",
};

const bluePalette = {
  dark: {
    background: "#21526B",
    backgroundSecondary: "#398DB8",
    accent: "#415D6B",
    primary: "#fff",
    secondary: "#000",
  },
  light: {
    background: "#91CFEE",
    backgroundSecondary: "#4AB4EB",
    accent: "#398DB8",
    primary: "#000",
    secondary: "#fff",
  },
};

const greenPalette = {
  dark: {
    background: "#1C6B4D",
    backgroundSecondary: "#30B884",
    accent: "#3C6B59",
    primary: "#fff",
    secondary: "#000",
  },
  light: {
    background: "#85EEC6",
    backgroundSecondary: "#3DEBA8",
    accent: "#30B884",
    primary: "#000",
    secondary: "#fff",
  },
};

const brownPalette = {
  dark: {
    background: "#6B4428",
    backgroundSecondary: "#B87445",
    accent: "#EB9457",
    primary: "#fff",
    secondary: "#000",
  },
  light: {
    background: "#EEC09F",
    backgroundSecondary: "#EB9457",
    accent: "#B87445",
    primary: "#000",
    secondary: "#fff",
  },
};

export const [darkThemeClass, darkThemeVars] = createTheme({
  color: bluePalette.dark,
  font: {
    family: "Merriweather",
    size: themeFontSizes,
  },
});

export const [lightThemeClass, lightThemeVars] = createTheme({
  color: bluePalette.light,
  font: {
    family: "Oxanium",
    size: themeFontSizes,
  },
});

export const drawColors = {
  yellow: "#f2f230",
  pink: "#e949f5",
  green: "#0fff50",
  blue: "#3f99ff",
  red: "#ff1818",
};

// export const runtimeColors = {
//   yellow: "#f2f230",
//   pink: "#e949f5",
//   neonpink: "#ff00ff",
//   green: "#0fff50",
//   neongreen: "#00ff00",
//   darkblue: "#2c84fa",
//   blue: "#3f99ff",
//   neonblue: "#00ffff",
//   red: "#ff1818",
//   fontPrimary: "#ffffff",
//   background: "#27262b",
//   background100: "#080c12",
//   background100a70: "#080c1270",
//   background100aee: "#080c12ef",
//   background200: "#12171d",
//   background300: "#567091",
// };

// export const [themeClass, themeVars] = createTheme({
//   fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
//   fontSizes: {
//     small: "13px",
//     standard: "15px",
//     bigger: "18px",
//     large: "20px",
//   },
//   colors: {
//     yellow: "#f2f230",
//     pink: "#e949f5",
//     neonpink: "#ff00ff",
//     green: "#0fff50",
//     neongreen: "#00ff00",
//     darkblue: "#2c84fa",
//     blue: "#3f99ff",
//     neonblue: "#00ffff",
//     red: "#ff1818",
//     fontPrimary: "#ffffff",
//     background: "#27262b",
//     background100: "#080c12",
//     background100a70: "#080c1270",
//     background100aee: "#080c12ef",
//     background200: "#12171d",
//     background300: "#567091",
//   },
// });

// export const runtime = {
//   fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
//   fontSizes: {
//     small: "13px",
//     standard: "15px",
//     bigger: "18px",
//     large: "20px",
//   },
//   colors: {
//     yellow: "#f2f230",
//     pink: "#e949f5",
//     neonpink: "#ff00ff",
//     green: "#0fff50",
//     neongreen: "#00ff00",
//     darkblue: "#2c84fa",
//     blue: "#3f99ff",
//     neonblue: "#00ffff",
//     red: "#ff1818",
//     fontPrimary: "#ffffff",
//     background: "#27262b",
//     background100: "#080c12",
//     background100a70: "#080c1270",
//     background100aee: "#080c12ef",
//     background200: "#12171d",
//     background300: "#567091",
//   },
// };
