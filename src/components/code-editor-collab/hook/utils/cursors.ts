import { debounce } from "lodash";
import { StateField, StateEffect } from "@codemirror/state";
import { type Extension } from "@uiw/react-codemirror";
import { type DecorationSet, EditorView, Decoration, WidgetType } from "@codemirror/view";

import { cursorBaseTheme } from "./cursor-theme"

export interface Cursor {
	id: string,
	from: number,
	to: number,
	tooltipText: string
}

export interface Cursors {
	cursors: Cursor[]
}

interface TooltipWidgetProps {
	name: string
	color: number
	pos: number
	withTooltip: boolean
}

class TooltipWidget extends WidgetType {
	private name = "";
	private suffix = "";
	private pos: number = 1;
	private withTooltip: boolean = true;
	private toggleTooltip: (dom: HTMLDivElement) => void = debounce((dom) => {
		dom.style.display = "none"
	}, 5000)

	constructor({
		color,
		name,
		pos,
		withTooltip
	}: TooltipWidgetProps) {
		super();
		this.suffix = `${color % 8 + 1}`;
		this.name = name;
		this.pos = pos;
		this.withTooltip = withTooltip;
	}

	toDOM(view: EditorView) {
		const docLength = view.state.doc.length >= this.pos ? this.pos: view.state.doc.length;
		const lineNumber = view.state.doc.lineAt(docLength).number;
		const isOnTheFirstLine = lineNumber === 1;
		const dom = document.createElement("div");
		dom.className = "cm-tooltip-none";
		dom.style.display = this.withTooltip ? "inline-block" : "none";

		const cursor_tooltip = document.createElement("div");
		const positionClassName = isOnTheFirstLine ? "cm-tooltip-below" : "cm-tooltip-above";
		const rotateClassName = isOnTheFirstLine ? "cm-tooltip-rotate": "";
		cursor_tooltip.className = `cm-tooltip-cursor cm-tooltip ${positionClassName} ${rotateClassName} cm-tooltip-${this.suffix}`;
		cursor_tooltip.textContent = this.name;

		const cursor_tooltip_arrow = document.createElement("div");
		cursor_tooltip_arrow.className = "cm-tooltip-arrow";

		cursor_tooltip.appendChild(cursor_tooltip_arrow);
		dom.appendChild(cursor_tooltip);

		if (this.withTooltip) {
			this.toggleTooltip(dom);
		}

		return dom
	}

	ignoreEvent() { return false }
}

export const addCursor = StateEffect.define<Cursor>();

const cursorsItems = new Map<string, number>();

const getCursorField = (tooltipText: string, withTooltip: boolean) => StateField.define<DecorationSet>({
	create() {
		return Decoration.none
	},
	update(cursors, tr) {
		let cursorTransacions = cursors.map(tr.changes)
		for (const e of tr.effects) if (e.is(addCursor)) {
			const addUpdates = [];
			if (!cursorsItems.has(e.value.id)) cursorsItems.set(e.value.id, cursorsItems.size);

			if (e.value.from !== e.value.to) {
				addUpdates.push(Decoration.mark({
					class: `cm-highlight-${cursorsItems.get(e.value.id)! % 8 + 1}`,
					id: e.value.id
				}).range(e.value.from, e.value.to));
			}

			addUpdates.push(
				Decoration.widget({
					widget: new TooltipWidget({
						name: e.value.tooltipText,
						color: cursorsItems.get(e.value.id)!,
						pos: e.value.to,
						withTooltip
					}),
					block: false,
					id: e.value.id
				}).range(e.value.to, e.value.to)
			);

			cursorTransacions = cursorTransacions.update({
				add: addUpdates,
				filter: (from, to, value ) => {
					if (value?.spec?.id === e.value.id) return false;
					return true;
				}
			})
		}

		return cursorTransacions;
	},
	provide: f => EditorView.decorations.from(f)
})

interface CursorExtentionProps {
	cursorId: string
	tooltipText: string
	withTooltip: boolean
}

export const cursorExtension = ({
	cursorId,
	tooltipText,
	withTooltip
}: CursorExtentionProps): Extension[] => {
	return [
		getCursorField(tooltipText, withTooltip),
		cursorBaseTheme,
		EditorView.updateListener.of(update => {
			update.transactions.forEach(e => { 
				if (e.selection) {
					const cursor: Cursor = {
						id: cursorId,
						from: e.selection.ranges[0].from,
						to: e.selection.ranges[0].to,
						tooltipText
					}

					update.view.dispatch({
						effects: addCursor.of(cursor)
					})
				}
			})
		}),
	];
}
