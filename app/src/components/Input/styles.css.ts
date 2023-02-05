import { recipe } from "@vanilla-extract/recipes";
import { baseStyle, themeVars } from "~/common/theme.css";
import { sprinkles } from "./../../common/theme.css";

export const InputStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      fontSize: "standard",
      backgroundColor: "background",
      color: "primary",
      borderRadius: "small",
    }),
    {
      boxShadow: "none",
      outline: "none",
      border: "none",
      padding: "4px 8px",
      appearance: "textfield",
    },
  ],
  variants: {
    transparent: {
      true: sprinkles({ backgroundColor: "none" }),
    },
    underline: {
      true: {
        borderBottom: `solid 1px ${themeVars.color.secondary}`,
      },
    },
    isTitle: {
      true: [
        sprinkles({
          fontSize: "big",
        }),
        {
          fontWeight: "bold",
        },
      ],
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
    size: {
      small: sprinkles({ fontSize: "small" }),
      smaller: sprinkles({ fontSize: "smaller" }),
      standard: sprinkles({ fontSize: "standard" }),
    },
  },
});

export const InputButtonStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      fontSize: "bigger",
      color: "primary",
      borderRadius: "small",
      backgroundColor: "none",
    }),
    {
      appearance: "textfield",
      outline: "none",
      border: `solid 1px ${themeVars.color.secondary}`,
      textAlign: "center",
      selectors: {
        "&:hover": {
          textDecoration: "none",
          cursor: "pointer",
        },
      },
    },
  ],
  variants: {
    size: {
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
      },
      small: [
        sprinkles({
          fontSize: "small",
        }),
        {
          padding: 2,
          paddingLeft: 3,
          paddingRight: 3,
        },
      ],
    },
  },
  defaultVariants: {
    size: "standard",
  },
});

export const InputAreaStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      backgroundColor: "background",
      color: "primary",
      fontSize: "bigger",
      padding: "small",
      borderRadius: "small",
    }),
    {
      userSelect: "contain",
      outline: "none",
      lineHeight: "1.1em",
      textAlign: "left",
      overflow: "auto",
      whiteSpace: "pre-wrap",
      selectors: {
        "&[disabled]": {
          opacity: 0.3,
        },
      },
    },
  ],
  variants: {
    small: {
      true: sprinkles({ fontSize: "standard" }),
    },
    transparent: {
      true: sprinkles({ backgroundColor: "none" }),
    },
    border: {
      none: {
        border: "none",
      },
      down: {
        borderBottom: `solid 1px ${themeVars.color.backgroundSecondary}`,
      },
      full: [
        sprinkles({
          borderRadius: "small",
        }),
        {
          border: `solid 1px ${themeVars.color.accent}`,
        },
      ],
    },
  },
  defaultVariants: {
    border: "none",
  },
});
