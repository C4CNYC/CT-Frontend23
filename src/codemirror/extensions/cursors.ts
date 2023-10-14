import { StateEffect, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from "@codemirror/view";

export interface cursor {
  id: string;
  from: number;
  to: number;
}

export interface Cursors {
  cursors: cursor[];
}

class TooltipWidget extends WidgetType {
  private readonly name: string = "John";
  private readonly suffix: string = "";
  private readonly id: string = "";

  constructor(name: string, color: number, id: string) {
    super();
    this.suffix = `${(color % 8) + 1}`;
    this.name = name;
    this.id = id;
  }

  toDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.className = "cm-tooltip-none";

    if (this.name === this.id) return dom;

    const cursorTooltip = document.createElement("div");
    cursorTooltip.className = `cm-tooltip-cursor cm-tooltip cm-tooltip-above cm-tooltip-${this.suffix}`;
    cursorTooltip.textContent = this.name;

    const cursorTooltipArrow = document.createElement("div");
    cursorTooltipArrow.className = "cm-tooltip-arrow";

    cursorTooltip.appendChild(cursorTooltipArrow);
    dom.appendChild(cursorTooltip);
    return dom;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

export const addCursor = StateEffect.define<cursor>();
export const removeCursor = StateEffect.define<string>();

const cursorsItems = new Map<string, number>();
const cursorUpdates = new Map<string, NodeJS.Timeout>();

const cursorField = (id: string): StateField<DecorationSet> =>
  StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },
    update(cursors, tr) {
      let cursorTransacions = cursors.map(tr.changes);
      for (const e of tr.effects) {
        if (e.is(addCursor)) {
          const addUpdates = [];
          if (!cursorsItems.has(e.value.id)) {
            cursorsItems.set(e.value.id, cursorsItems.size);
          }

          if (e.value.from !== e.value.to) {
            addUpdates.push(
              Decoration.mark({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                class: `cm-highlight-${
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  (cursorsItems.get(e.value.id)! % 8) + 1
                }`,
                id: e.value.id,
              }).range(e.value.from, e.value.to)
            );
          }

          addUpdates.push(
            Decoration.widget({
              widget: new TooltipWidget(
                e.value.id,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                cursorsItems.get(e.value.id)!,
                id
              ),
              block: false,
              id: e.value.id,
            }).range(e.value.to, e.value.to)
          );

          cursorTransacions = cursorTransacions.update({
            add: addUpdates,
            filter: (from, to, value) => {
              if (value?.spec?.id === e.value.id) return false;
              return true;
            },
          });
        } else if (e.is(removeCursor)) {
          cursorTransacions = cursorTransacions.update({
            filter: (from, to, value) => {
              if (value?.spec?.id === e.value) return false;
              return true;
            },
          });
        }
      }

      return cursorTransacions;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

const cursorBaseTheme = EditorView.baseTheme({
  ".cm-tooltip-above .cm-tooltip-arrow": {
    bottom: "24px!important",
    transform: "rotate(176deg)",
  },
  ".cm-highlight-me": {
    display: "none",
  },
  ".cm-tooltip.cm-tooltip-cursor": {
    color: "white",
    border: "none",
    padding: "2px 7px",
    borderRadius: "4px",
    position: "absolute",
    marginBottom: "-50px",
    marginLeft: "-13px",
    "& .cm-tooltip-arrow:after": {
      borderTopColor: "transparent",
    },
    zIndex: "1000000",
  },
  ".cm-tooltip-none": {
    width: "0px",
    height: "0px",
    display: "inline-block",
  },
  ".cm-highlight-1": {
    backgroundColor: "#6666BB55",
  },
  ".cm-highlight-2": {
    backgroundColor: "#F76E6E55",
  },
  ".cm-highlight-3": {
    backgroundColor: "#0CDA6255",
  },
  ".cm-highlight-4": {
    backgroundColor: "#0CC5DA55",
  },
  ".cm-highlight-5": {
    backgroundColor: "#0C51DA55",
  },
  ".cm-highlight-6": {
    backgroundColor: "#980CDA55",
  },
  ".cm-highlight-7": {
    backgroundColor: "#DA0CBB55",
  },
  ".cm-highlight-8": {
    backgroundColor: "#DA800C55",
  },
  ".cm-tooltip-1": {
    backgroundColor: "#66b !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#66b !important",
    },
  },
  ".cm-tooltip-2": {
    backgroundColor: "#F76E6E !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#F76E6E !important",
    },
  },
  ".cm-tooltip-3": {
    backgroundColor: "#0CDA62 !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#0CDA62 !important",
    },
  },
  ".cm-tooltip-4": {
    backgroundColor: "#0CC5DA !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#0CC5DA !important",
    },
  },
  ".cm-tooltip-5": {
    backgroundColor: "#0C51DA !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#0C51DA !important",
    },
  },
  ".cm-tooltip-6": {
    backgroundColor: "#980CDA !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#980CDA !important",
    },
  },
  ".cm-tooltip-7": {
    backgroundColor: "#DA0CBB !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#DA0CBB !important",
    },
  },
  ".cm-tooltip-8": {
    backgroundColor: "#DA800C !important",
    "& .cm-tooltip-arrow:before": {
      borderTopColor: "#DA800C !important",
    },
  },
});

export function cursorExtension(id = ""): any[] {
  return [
    cursorField(id),
    cursorBaseTheme,
    EditorView.updateListener.of((update) => {
      update.transactions.forEach((e) => {
        e.effects.filter(e => e.is(addCursor)).forEach((e) => {
          // Hide cursor again after 5 seconds if no update occurs
          if (cursorUpdates.has(e.value.id)) {
            clearTimeout(cursorUpdates.get(e.value.id));
          }
          cursorUpdates.set(e.value.id, setTimeout(() => {
            update.view.dispatch({
              effects: removeCursor.of(e.value.id)
            });
          }, 5000));
        });
      });
    }),
    EditorView.updateListener.of((update) => {
      update.transactions.forEach((e) => {
        if (e.selection) {
          const cursor: cursor = {
            id,
            from: e.selection.ranges[0].from,
            to: e.selection.ranges[0].to,
          };

          update.view.dispatch({
            effects: addCursor.of(cursor),
          });
        }
      });
    }),
  ];
}
