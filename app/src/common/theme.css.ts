import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  color: {
    background: "",
    backgroundMid: "",
    backgroundLight: "",
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

export const [darkThemeClass, darkThemeVars] = createTheme({
  color: {
    background: "#3c2a4d",
    backgroundMid: "#503a65",
    backgroundLight: "#574f7d",
    primary: "#e0f0ea",
    secondary: "#95adbe",
  },
  font: {
    family: "Oxanium",
    size: {
      standard: "15px",
      bigger: "17px",
      large: "19px",
      smaller: "13px",
      small: "11px",
    },
  },
});

export const [lightThemeClass, lightThemeVars] = createTheme({
  color: {
    background: "#e0f0ea",
    backgroundMid: "#95adbe",
    backgroundLight: "#574f7d",
    primary: "#3c2a4d",
    secondary: "#503a65",
  },
  font: {
    family: "Oxanium",
    size: {
      standard: "15px",
      bigger: "17px",
      large: "19px",
      smaller: "13px",
      small: "11px",
    },
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
