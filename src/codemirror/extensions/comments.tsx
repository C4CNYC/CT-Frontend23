import { StateEffect, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { createRoot } from "react-dom/client";
import { CgChevronDown, CgChevronUp, CgClose, CgComment } from "react-icons/cg";

import { Collapse, IconButton } from "@mui/material";

export interface Comment {
  id: string;
  from: number;
  to: number;
  createdBy: string;
  content: string;
}

export interface AddComment extends Comment {
  type: "add-comment";
}

export interface RemoveComment {
  type: "remove-comment";
  id: string;
}

export interface Comments {
  comments: Comment[];
}

function CommentContent({
  comment,
  isExpanded,
}: {
  comment: Comment;
  isExpanded?: boolean;
}) {
  return (
    <div className="cm-comment-content">
      <div className="cm-comment-title-wrapper">
        <CgComment size={20} className="cm-comment-icon" />
        <p className="cm-comment-title">Comment</p>
        {!isExpanded && (
          <IconButton className="cm-comment-toggle-visibility-icon-button">
            <CgChevronDown
              size={20}
              className="cm-comment-toggle-visibility-icon"
            />
          </IconButton>
        )}
        {isExpanded && (
          <IconButton className="cm-comment-toggle-visibility-icon-button">
            <CgChevronUp
              size={20}
              className="cm-comment-toggle-visibility-icon"
            />
          </IconButton>
        )}
        <IconButton className="cm-comment-delete-comment-icon-button">
          <CgClose size={20} className="cm-comment-delete-comment-icon" />
        </IconButton>
      </div>
      <Collapse in={isExpanded}>
        <p className="cm-comment-text">{comment.content}</p>
      </Collapse>
    </div>
  );
}

class CommentWidget extends WidgetType {
  constructor(
    private readonly comment: Comment,
    private readonly isExpanded = true
  ) {
    super();
  }

  eq(widget: WidgetType): boolean {
    return (
      this.comment.id === (widget as CommentWidget).comment.id &&
      this.isExpanded === (widget as CommentWidget).isExpanded
    );
  }

  toDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.className = "cm-comment";
    dom.setAttribute("data-comment-id", this.comment.id);
    const root = createRoot(dom);
    root.render(
      <CommentContent comment={this.comment} isExpanded={this.isExpanded} />
    );
    return dom;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

export const addComment = StateEffect.define<AddComment>();
export const removeComment = StateEffect.define<RemoveComment>();

export const toggleCommentVisibility = StateEffect.define<string>();

const commentField = (): StateField<DecorationSet> =>
  StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },
    update(oldComments, tr) {
      let comments = oldComments.map(tr.changes);
      for (const e of tr.effects) {
        if (e.is(addComment)) {
          const addUpdates = [];

          if (e.value.from !== e.value.to) {
            addUpdates.push(
              Decoration.mark({
                class: "cm-highlight-comment",
                id: `${e.value.id}-highlight`,
              }).range(e.value.from, e.value.to)
            );
          }

          addUpdates.push(
            Decoration.widget({
              id: e.value.id,
              comment: e.value,
              isExpanded: true,
              widget: new CommentWidget(e.value, true),
              block: true,
            }).range(e.value.to, e.value.to)
          );

          comments = comments.update({
            add: addUpdates,
            filter: (from, to, value) => {
              return value?.spec?.id !== e.value.id;
            },
          });
        } else if (e.is(removeComment)) {
          comments = comments.update({
            filter: (from, to, value) => {
              return (
                value?.spec?.id !== e.value.id &&
                value?.spec?.id !== `${e.value.id}-highlight`
              );
            },
          });
        } else if (e.is(toggleCommentVisibility)) {
          const cursor = oldComments.iter();
          while (cursor.value) {
            if (cursor.value.spec.id === e.value) {
              const isExpanded = cursor.value.spec.isExpanded;
              comments = comments.update({
                filter: (from, to, value) => {
                  return value?.spec?.id !== e.value;
                },
              });
              comments = comments.update({
                add: [
                  Decoration.widget({
                    id: cursor.value.spec.id,
                    comment: cursor.value.spec.comment,
                    isExpanded: !isExpanded,
                    widget: new CommentWidget(
                      cursor.value.spec.comment,
                      !isExpanded
                    ),
                    block: true,
                  }).range(
                    cursor.value.spec.comment.to,
                    cursor.value.spec.comment.to
                  ),
                ],
              });
            }
            cursor.next();
          }
        }
      }

      return comments;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

const commentsBaseTheme = EditorView.baseTheme({
  ".cm-highlight-comment": {
    backgroundColor: "#0CC5DA55",
  },
  ".cm-comment": {
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
  },
  ".cm-comment-content": {
    padding: "4px 8px",
    color: "#000000",
    fontFamily: "sans-serif",
  },
  ".cm-comment-title-wrapper": {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
  },
  ".cm-comment-toggle-visibility-icon-button": {
    marginLeft: "auto",
  },
  ".cm-comment-title": {
    color: "#171717",
    fontWeight: "bold",
    fontSize: "1.1rem",
    margin: "0",
  },
  ".cm-comment-text": {
    margin: "0",
  },
});

export function commentsExtension(userId: string): any[] {
  return [
    commentField(),
    commentsBaseTheme,
    ViewPlugin.define(
      () => {
        return {
          update(update: ViewUpdate) {},
        };
      },
      {
        eventHandlers: {
          mousedown: (event: MouseEvent, view: EditorView) => {
            const target = event.target as HTMLElement;
            if (
              (target.nodeName === "BUTTON" &&
                target.classList.contains(
                  "cm-comment-toggle-visibility-icon-button"
                )) ||
              (target.nodeName === "svg" &&
                target.classList.contains("cm-comment-toggle-visibility-icon"))
            ) {
              const commentId = target
                .closest(".cm-comment")
                ?.getAttribute("data-comment-id");
              if (!commentId) {
                // eslint-disable-next-line no-console
                console.warn("Could not find comment id");
              } else {
                view.dispatch({
                  effects: toggleCommentVisibility.of(commentId),
                });
              }
            }

            if (
              (target.nodeName === "BUTTON" &&
                target.classList.contains(
                  "cm-comment-delete-comment-icon-button"
                )) ||
              (target.nodeName === "svg" &&
                target.classList.contains("cm-comment-delete-comment-icon"))
            ) {
              const commentId = target
                .closest(".cm-comment")
                ?.getAttribute("data-comment-id");
              if (!commentId) {
                // eslint-disable-next-line no-console
                console.warn("Could not find comment id");
              } else {
                view.dispatch({
                  effects: removeComment.of({
                    type: "remove-comment",
                    id: commentId,
                  }),
                });
              }
            }
          },
        },
      }
    ),
  ];
}
