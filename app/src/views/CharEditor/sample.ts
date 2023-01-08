export const sample = {
  type: "object",
  title: "Cyber",
  properties: {
    Name: {
      type: "string",
    },
    Background: {
      type: "string",
      enumSource: [["a"], ["b"], ["c"]],
    },
    Abilities: {
      type: "object",
      format: "grid-strict",
      properties: {
        Bod: {
          type: "integer",
          title: "Body",
          options: {
            grid_columns: 6,
          },
        },
        BodMax: {
          type: "integer",
          title: "Max",
          options: {
            grid_columns: 6,
            grid_break: true,
          },
        },
        BodButton: {
          type: "button",
          title: "Roll Bod",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "1d20<={param}",
              roll_param: "root.Abilities.Bod",
            },
          },
        },
        BodButtonEasy: {
          type: "button",
          title: "Roll Easy Bod",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "download",
              roll: "2d20kl<={param}",
              roll_param: "root.Abilities.Bod",
            },
          },
        },
        BodButtonHard: {
          type: "button",
          title: "Roll Hard Bod",
          options: {
            grid_columns: 4,
            grid_break: true,
            button: {
              action: "roll",
              icon: "upload",
              roll: "2d20kh<={param}",
              roll_param: "root.Abilities.Bod",
            },
          },
        },
        Psy: {
          type: "integer",
          title: "Psyche",
          options: {
            grid_columns: 6,
          },
        },
        PsyMax: {
          type: "integer",
          title: "Max",
          options: {
            grid_columns: 6,
            grid_break: true,
          },
        },
        PsyButton: {
          type: "button",
          title: "Roll Psy",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "1d20<={param}",
              roll_param: "root.Abilities.Psy",
            },
          },
        },
        PsyButtonEasy: {
          type: "button",
          title: "Roll Easy Psy",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "2d20kl<={param}",
              roll_param: "root.Abilities.Psy",
            },
          },
        },
        PsyButtonHard: {
          type: "button",
          title: "Roll Hard Psy",
          options: {
            grid_columns: 4,
            grid_break: true,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "2d20kh<={param}",
              roll_param: "root.Abilities.Psy",
            },
          },
        },
        Int: {
          type: "integer",
          title: "Interface",
          options: {
            grid_columns: 6,
          },
        },
        WillMax: {
          type: "integer",
          title: "Max",
          options: {
            grid_columns: 6,
            grid_break: true,
          },
        },
        IntButton: {
          type: "button",
          title: "Roll Int",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "1d20<={param}",
              roll_param: "root.Abilities.Int",
            },
          },
        },
        IntButtonEasy: {
          type: "button",
          title: "Roll Easy Int",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "2d20kl<={param}",
              roll_param: "root.Abilities.Int",
            },
          },
        },
        IntButtonHard: {
          type: "button",
          title: "Roll Hard Int",
          options: {
            grid_columns: 4,
            button: {
              action: "roll",
              icon: "refresh",
              roll: "2d20kh<={param}",
              roll_param: "root.Abilities.Int",
            },
          },
        },
      },
    },
    Other: {
      type: "object",
      format: "grid-strict",
      properties: {
        HP: {
          title: "HP Current",
          type: "integer",
          options: {
            grid_columns: 6,
          },
        },
        HPMax: {
          type: "integer",
          title: "HP Max",
          options: {
            grid_columns: 6,
            grid_break: true,
            input_width: "25px",
          },
        },
        Armor: {
          type: "integer",
          title: "Armor",
          options: {
            grid_columns: 6,
          },
        },
        Deprived: {
          type: "boolean",
          format: "checkbox",
          title: "DEPRIVED",
          options: {
            grid_columns: 6,
            grid_break: true,
          },
        },
      },
    },
    Cyberware: {
      type: "array",
      format: "tabs-top",
      options: {
        grid_columns: 12,
      },
      items: {
        type: "object",
        title: "Cybermod",
        properties: {
          Name: {
            type: "string",
          },
          Description: {
            type: "string",
            format: "textarea",
          },
        },
      },
    },
    Equipment: {
      type: "array",
      format: "tabs-top",
      options: {
        grid_columns: 12,
      },
      items: {
        type: "object",
        title: "Item",
        properties: {
          Name: {
            type: "string",
          },
          Fatigue: {
            type: "boolean",
            format: "checkbox",
            title: "Fatigue",
          },
          DescirptionTitle: {
            type: "info",
            title: "Description",
          },
          Description: {
            type: "string",
            title: " ",
            format: "textarea",
          },
        },
      },
    },
    NotesTitle: {
      type: "info",
      title: "Notes",
    },
    Notes: {
      type: "string",
      format: "textarea",
      title: "Notes",
      options: {
        grid_columns: 12,
        compact: true,
      },
    },
  },
  options: {
    disable_collapse: true,
    "data-bkg": "warhammer-en-dark.jpg",
    "data-bkg-top": "130px",
    "data-bkg-padding": "40px",
    "data-bkg-width": "770px",
    "data-bkg-height": "850px",
  },
  required: ["Name"],
};
