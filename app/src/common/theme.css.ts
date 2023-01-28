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
      xsmall: "",
    },
  },
});

const themeFontSizes = {
  standard: "15px",
  bigger: "17px",
  large: "20px",
  smaller: "13px",
  small: "11px",
  xsmall: "10px",
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

const sandPalette = {
  dark: {
    background: "#3B2300",
    backgroundSecondary: "#724C13",
    accent: "#AA7C39",
    primary: "#fff",
    secondary: "#FFDCA9",
  },
  light: {
    background: "#91CFEE",
    backgroundSecondary: "#4AB4EB",
    accent: "#398DB8",
    primary: "#000",
    secondary: "#fff",
  },
};

export const [darkThemeClass, darkThemeVars] = createTheme({
  color: sandPalette.dark,
  font: {
    family: "Cantarell",
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
