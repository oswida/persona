import { baseStyle, sprinkles } from "./../../../common/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

const starSVG = (fill?: string) => {
  const f = fill ? fill : "none";
  return `<svg width='320' height='320'><path  d='M 160.000 180.000 L 183.511 192.361 L 179.021 166.180 L 198.042 147.639 L 171.756 143.820 L 160.000 120.000 L 148.244 143.820 L 121.958 147.639 L 140.979 166.180 L 136.489 192.361 L 160.000 180.000' stroke='#fff' stroke-width='1' fill='${f}'/></svg>`;
};

export const ResourceStyle = style({});

export const TplNumericStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      backgroundColor: "none",
      fontSize: "standard",
      color: "primary",
    }),
    {
      width: "2.5rem",
      height: "2.5rem",
      padding: "0.1rem",
      textAlign: "center",
      verticalAlign: "middle",
      outline: "none",
    },
  ],
  variants: {
    decoration: {
      circle: {
        border: `1px solid ${themeVars.color.primary}`,
        borderRadius: "50%",
      },
      square: {
        border: `1px solid ${themeVars.color.primary}`,
        borderRadius: "10px",
      },
      underline: {
        border: "none",
        borderBottom: `1px solid ${themeVars.color.primary}`,
      },
      none: {
        border: "none",
      },
    },
  },
});

export const TplSlashStyle = style({
  width: "0.5rem",
  height: "2.5rem",
  transform: "rotate(20deg) translate(-0.3em,-0.1em)",
  transformOrigin: "bottom left",
  borderLeft: `2px solid ${themeVars.color.primary}`,
  boxSizing: "border-box",
});

export const TplMarkStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      color: "primary",
    }),
    {
      width: "0.9rem",
      height: "0.9rem",
      border: `solid 1px ${themeVars.color.primary}`,
      alignSelf: "center",
      position: "relative",
      textAlign: "center",
    },
  ],
  variants: {
    decoration: {
      circle: {
        borderRadius: "50%",
      },
      square: {
        borderRadius: "5px",
      },
      star: {
        border: "none",
        selectors: {
          "&:before": {
            content: "☆",
            position: "absolute",
            top: 0,
            display: "inline",
            transform: "translate(-50%, -0.5rem)",
            fontSize: "1.5rem",
          },
        },
      },
    },
    checked: {
      true: {
        backgroundColor: themeVars.color.primary,
      },
      false: {
        backgroundColor: themeVars.color.background,
      },
    },
  },
});
