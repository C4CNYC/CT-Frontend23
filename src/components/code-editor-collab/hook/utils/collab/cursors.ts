import { debounce } from "lodash";
import { StateField, StateEffectType } from "@codemirror/state";
import { type Extension } from "@uiw/react-codemirror";
import {
	type DecorationSet,
	EditorView,
	Decoration,
	WidgetType
} from "@codemirror/view";

import { cursorBaseTheme } from "./cursor-theme";

const TOOLTIP_IN_VIEW_TIME = 5000;
const debouncedHideTooltip = debounce(
	(dom: HTMLDivElement) => dom.style.display = "none",
	TOOLTIP_IN_VIEW_TIME
)

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
		const dom = document.createElement("div");

		if (!this.withTooltip) {
			dom.style.display = "none";

			return dom;
		}

		const docLength = view.state.doc.length >= this.pos ? this.pos: view.state.doc.length;
		const lineNumber = view.state.doc.lineAt(docLength).number;
		const isOnTheFirstLine = lineNumber === 1;

		dom.className = "cm-tooltip-none";
		dom.style.display = "inline-block"

		const cursorTooltip = document.createElement("div");
		const positionClassName = isOnTheFirstLine ? "cm-tooltip-below" : "cm-tooltip-above";
		const rotateClassName = isOnTheFirstLine ? "cm-tooltip-rotate": "";

		cursorTooltip.className = `cm-tooltip-cursor cm-tooltip ${positionClassName} ${rotateClassName} cm-tooltip-${this.suffix}`;
		cursorTooltip.textContent = this.name;

		const tooltipArrow = document.createElement("div");
		tooltipArrow.className = "cm-tooltip-arrow";

		cursorTooltip.appendChild(tooltipArrow);
		dom.appendChild(cursorTooltip);

		debouncedHideTooltip(dom);

		return dom
	}

	ignoreEvent() {
		return false;
	}
}

const getCursorField = (addCursor: StateEffectType<Cursor>, withTooltip: boolean) => {
	const cursorsItems = new Map<string, number>();

	return StateField.define<DecorationSet>({
	create() {
		return Decoration.none
	},
	update(cursors, tr) {
		let cursorTransacions = cursors.map(tr.changes);

		for (const e of tr.effects) if (e.is(addCursor)) {
			const addUpdates = [];
			if (!cursorsItems.has(e.value.id)) cursorsItems.set(e.value.id, cursorsItems.size);

			if (e.value.from !== e.value.to) {
				const className = `cm-highlight-${cursorsItems.get(e.value.id)! % 8 + 1}`;

				addUpdates
					.push(Decoration.mark({ class: className, id: e.value.id })
					.range(e.value.from, e.value.to));
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
				})
				.range(e.value.to, e.value.to)
			);

			cursorTransacions = cursorTransacions.update({
				add: addUpdates,
				filter: (_, __, value) => value?.spec?.id !== e.value.id
			})
		}

		return cursorTransacions;
	},
	provide: f => EditorView.decorations.from(f)
})
}

interface CursorExtentionProps {
	cursorId: string
	tooltipText: string
	withTooltip: boolean
	addCursor: StateEffectType<Cursor>
}

export const cursorExtension = ({
	cursorId,
	tooltipText,
	withTooltip,
	addCursor
}: CursorExtentionProps): Extension[] => {
	return [
		getCursorField(addCursor, withTooltip),
		cursorBaseTheme,
		EditorView.updateListener.of(update => {
			update.transactions.forEach(e => { 
				if (e.selection) {
					update.view.dispatch({
						effects: addCursor.of({
							id: cursorId,
							from: e.selection.ranges[0].from,
							to: e.selection.ranges[0].to,
							tooltipText
						})
					})
				}
			})
		}),
	];
}
