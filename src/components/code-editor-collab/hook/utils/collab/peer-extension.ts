import { Socket } from "socket.io-client"
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import {
	receiveUpdates,
	sendableUpdates,
	collab,
	getSyncedVersion
} from "@codemirror/collab"

import { EmitSocketEvents } from "../socket";
import { pullUpdates } from "./pull-updates";
import { pushUpdates } from "./push-updates";
import { StateEffectType } from "@uiw/react-codemirror";
import { Cursor } from "./cursors";
import { File } from "./requests";

interface PeerExtensionProps {
	socket: Socket
	roomId: string
	startVersion: number
	fileName: File
	addCursor: StateEffectType<Cursor>
}

export const peerExtension = ({
	socket,
	roomId,
	startVersion,
	fileName,
	addCursor
}: PeerExtensionProps) => {
	const plugin = ViewPlugin.fromClass(class {
		private pushing = false
		private done = false

		constructor(private view: EditorView) {
			this.pull();
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.transactions[0]?.effects[0]) {
				this.push()
			}
		}

		async push() {
			const updates = sendableUpdates(this.view.state);
			const isSkipped = this.pushing || !updates.length;

			if (isSkipped) {
				return;
			}

			this.pushing = true;

			const version = getSyncedVersion(this.view.state);
			await pushUpdates({ socket, roomId, version, updates, fileName });
			this.pushing = false;

			if (sendableUpdates(this.view.state).length) {
				setTimeout(() => {
					this.push()
				}, 100);
			}
		}

		async pull() {
			while (!this.done) {
				const version = getSyncedVersion(this.view.state);
				const updates = await pullUpdates({
					socket,
					roomId,
					version,
					fileName,
					addCursor,
				});

				const newUpdates = receiveUpdates(this.view.state, updates);
				this.view.dispatch(newUpdates);
			}
		}

		destroy() {
			socket.off(`${EmitSocketEvents.PullResponse}${roomId}${fileName.id}`);
			this.done = true;
		}
	})

	return [
		collab({
			startVersion,
			sharedEffects: tr => 
				tr.effects.filter(e =>
					e.is(addCursor))
		}),
		plugin
	]
}
