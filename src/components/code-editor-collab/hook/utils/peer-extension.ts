import { Socket } from "socket.io-client"
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { StateEffect, Text, ChangeSet } from "@codemirror/state"
import { type Update, receiveUpdates, sendableUpdates, collab, getSyncedVersion } from "@codemirror/collab"

import { type Cursor, addCursor } from "./cursors" 

const pushUpdates = (
	socket: Socket,
	docName: string,
	version: number,
	fullUpdates: readonly Update[]
): Promise<boolean> => {
	// Strip off transaction data
	const updates = fullUpdates.map(u => ({
		clientID: u.clientID,
		changes: u.changes.toJSON(),
		effects: u.effects
	}))

	return new Promise(function(resolve) {
		socket.emit('pushUpdates', docName, version, JSON.stringify(updates));

		socket.once('pushUpdateResponse', function(status: boolean) {
			resolve(status);
		});
	});
}

const pullUpdates = (
	socket: Socket,
	docName: string,
	version: number
): Promise<readonly Update[]> => {
	return new Promise(function(resolve) {
		socket.emit('pullUpdates', docName, version);

		socket.once('pullUpdateResponse', function(updates) {
			resolve(JSON.parse(updates));
		});
	}).then((updates: any) => updates.map((u: any) => {
		if (u.effects[0]) {
			const effects: StateEffect<Cursor>[] = [];

			u.effects.forEach((effect: StateEffect<Cursor>) => {
				if (effect.value?.id) {
					const cursor: Cursor = {
						id: effect.value.id,
						from: effect.value.from,
						to: effect.value.to,
						tooltipText: effect.value.tooltipText
					}

					effects.push(addCursor.of(cursor))
				}
			})

			return {
				changes: ChangeSet.fromJSON(u.changes),
				clientID: u.clientID,
				effects
			}
		}
		
		return {
			changes: ChangeSet.fromJSON(u.changes),
			clientID: u.clientID
		}
	}));
}

interface GetDocumentProps {
	socket: Socket
	roomId: string
	cursorName: string
}

interface GetDocumentReturn {
	version: number,
	doc: Text,
	cursorName: string
}

export const getDocument = ({
	socket,
	roomId,
	cursorName
}: GetDocumentProps): Promise<GetDocumentReturn> => {
	return new Promise(function(resolve) {
		socket.emit('getDocument', roomId, cursorName);

		socket.once('getDocumentResponse', function(version: number, doc: string, cursorName: string) {
			resolve({
				version,
				doc: Text.of(doc.split("\n")),
				cursorName
			});
		});
	});
}

interface PeerExtensionProps {
	socket: Socket
	roomId: string
	startVersion: number
	cursorId: string
}

export const peerExtension = ({
	socket,
	roomId,
	startVersion,
	cursorId,
}: PeerExtensionProps) => {
	const plugin = ViewPlugin.fromClass(class {
		private pushing = false
		private done = false

		constructor(private view: EditorView) {
			this.pull()
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.transactions[0]?.effects[0]) {
				this.push()
			}
		}

		async push() {
			const updates = sendableUpdates(this.view.state);
			if (this.pushing || !updates.length) {
				return;
			}

			this.pushing = true;

			const version = getSyncedVersion(this.view.state);
			await pushUpdates(socket, roomId, version, updates);

			this.pushing = false;
			// Regardless of whether the push failed or new updates came in
			// while it was running, try again if there's updates remaining
			if (sendableUpdates(this.view.state).length) {
				setTimeout(() => this.push(), 100);
			}
				
		}

		async pull() {
			while (!this.done) {
				const version = getSyncedVersion(this.view.state);
				const updates = await pullUpdates(socket, roomId, version);
				const newUpdates = receiveUpdates(this.view.state, updates);

				this.view.dispatch(newUpdates)
			}
		}

		destroy() {
			this.done = true
		}
	})

	return [
		collab({
			startVersion,
			clientID: cursorId,
			sharedEffects: tr => 
				tr.effects.filter(e =>
					e.is(addCursor))
		}),
		plugin
	]
}
