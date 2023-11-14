import { SelectionRange, StateEffect, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { createRoot } from "react-dom/client";

import { Button, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import TextField from "@mui/material/TextField";

import { addComment } from "./comments";

interface ContextMenu {
  position: ContextMenuPosition;
  type: "ctx" | "comment";
}

interface ContextMenuPosition {
  top: number;
  left: number;
}

export const showContextMenu = StateEffect.define<ContextMenu>();
export const hideContextMenu = StateEffect.define<boolean>();

export const setSelection = StateEffect.define<SelectionRange>();
export const selection = StateField.define<SelectionRange | undefined>({
  create() {
    return undefined;
  },
  update(oldSelection, tr) {
    for (const e of tr.effects) {
      if (e.is(setSelection)) {
        return e.value;
      }
    }
    return oldSelection;
  },
});

class ContextMenuWidget extends WidgetType {
  constructor(
    private readonly position: ContextMenuPosition | undefined,
    private readonly contextMenuType: "ctx" | "comment"
  ) {
    super();
  }

  eq(widget: WidgetType): boolean {
    return (
      this.position?.top === (widget as ContextMenuWidget).position?.top &&
      this.position?.left === (widget as ContextMenuWidget).position?.left &&
      this.contextMenuType === (widget as ContextMenuWidget).contextMenuType
    );
  }

  toDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.className = "cm-context-menu";
    const root = createRoot(dom);
    root.render(
      <Popper
        id="cm-context-menu"
        open={this.position !== undefined}
        anchorEl={
          this.position
            ? {
                getBoundingClientRect: () => {
                  return {
                    top: this.position?.top ?? 0,
                    left: this.position?.left ?? 0,
                    right: this.position?.left ?? 0,
                    bottom: this.position?.top ?? 0,
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    toJSON(): any {},
                  } satisfies DOMRect;
                },
              }
            : undefined
        }
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              {this.contextMenuType === "ctx" && (
                <MenuList>
                  <MenuItem id="cm-context-menu-comment">
                    Create comment
                  </MenuItem>
                </MenuList>
              )}
              {this.contextMenuType === "comment" && (
                <div className="cm-context-menu-wrapper">
                  <TextField
                    label="Comment"
                    variant="outlined"
                    inputProps={{ id: "cm-context-menu-comment-input-field" }}
                    autoFocus
                  />
                  <Button id="cm-context-menu-comment-submit-button">
                    Submit
                  </Button>
                </div>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    );
    return dom;
  }

  ignoreEvent(event: Event): boolean {
    return event.type !== "click";
  }
}

const contextMenuBaseTheme = EditorView.baseTheme({
  ".cm-context-menu-wrapper": {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
    padding: "8px",
  },
});

const contextMenuField = (): StateField<DecorationSet> =>
  StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },
    update(oldContextMenu, tr) {
      let contextMenu = oldContextMenu.map(tr.changes);
      for (const e of tr.effects) {
        if (e.is(showContextMenu)) {
          const addUpdates = [];

          addUpdates.push(
            Decoration.widget({
              widget: new ContextMenuWidget(e.value.position, e.value.type),
              block: false,
            }).range(0)
          );

          contextMenu = contextMenu.update({
            add: addUpdates,
            filter: () => {
              return false;
            },
          });
        } else if (e.is(hideContextMenu)) {
          contextMenu = contextMenu.update({
            filter: () => {
              return false;
            },
          });
        }
      }

      return contextMenu;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

export function contextMenuExtension(userId: string): any[] {
  return [
    contextMenuField(),
    selection,
    contextMenuBaseTheme,
    ViewPlugin.define(
      () => {
        return {
          update(update: ViewUpdate) {},
        };
      },
      {
        eventHandlers: {
          contextmenu: (event: MouseEvent, view: EditorView) => {
            event.preventDefault();
            view.dispatch({
              effects: [
                showContextMenu.of({
                  position: {
                    top: event.clientY + 2,
                    left: event.clientX + 2,
                  },
                  type: "ctx",
                }),
                setSelection.of(view.state.selection.main),
              ],
            });
          },
          click: (event: MouseEvent, view: EditorView) => {
            const target = event.target as HTMLElement;
            if (target.id === "cm-context-menu-comment") {
              event.stopPropagation();
              view.dispatch({
                effects: [
                  showContextMenu.of({
                    position: {
                      top: event.clientY + 2,
                      left: event.clientX + 2,
                    },
                    type: "comment",
                  }),
                ],
              });
            } else if (target.id === "cm-context-menu-comment-submit-button") {
              const s = view.state.field(selection);
              view.dispatch({
                effects: addComment.of({
                  type: "add-comment",
                  id: crypto.randomUUID(),
                  from: s?.from ?? 0,
                  to: s?.to ?? 0,
                  content:
                    (
                      document.getElementById(
                        "cm-context-menu-comment-input-field"
                      ) as HTMLInputElement
                    )?.value ?? "Empty comment",
                  createdBy: userId,
                }),
              });
              view.dispatch({
                effects: hideContextMenu.of(true),
              });
            } else if (target.closest("#cm-context-menu")) {
              // Do nothing if click is inside context menu
            } else {
              view.dispatch({
                effects: hideContextMenu.of(true),
              });
            }
          },
        },
      }
    ),
  ];
}
