import { Socket } from "socket.io-client"
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { StateEffect, Text, ChangeSet } from "@codemirror/state"
import {
	type Update,
	receiveUpdates,
	sendableUpdates,
	collab,
	getSyncedVersion
} from "@codemirror/collab"

import { type Cursor, addCursor } from "./cursors" 
import { EmitSocketEvents, SubscribedEvents } from "./socket"

const pushUpdates = (
	socket: Socket,
	docName: string,
	version: number,
	fullUpdates: readonly Update[],
	fileName: string ,
): Promise<boolean> => {
	// Strip off transaction data
	const updates = fullUpdates.map(u => ({
		clientID: u.clientID,
		changes: u.changes.toJSON(),
		effects: u.effects
	}))

	return new Promise(function(resolve) {
		socket.emit(EmitSocketEvents.Push, docName, version, JSON.stringify(updates), fileName);

		socket.once(SubscribedEvents.PushResponse, function(status: boolean) {
			resolve(status);
		});
	});
}

const pullUpdates = (
	socket: Socket,
	roomId: string,
	version: number,
	fileName: string,
): Promise<readonly Update[]> => {
	return new Promise(function(resolve) {
		socket.emit(EmitSocketEvents.Pull, roomId, version, fileName, socket.id);

		socket.once(`${EmitSocketEvents.PullResponse}${roomId}${fileName}`, function(updates) {
			resolve(JSON.parse(updates));
		});
	}).then((updates: any) => updates?.map((u: any) => {
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
	fileName?: string
	preloadedCode?: string
}

interface GetDocumentReturn {
	version: number,
	doc: Text,
	cursorName: string
	updates: any
}

export interface FileInfo {
	activeFile: string
	files: string[]
	filesInLayout: string[]
}

export const getFileInfo = async (roomId: string, socket: Socket): Promise<FileInfo> => {
	return new Promise((resolve) => {
		socket.emit(EmitSocketEvents.GetFileInfo, roomId);

		socket.once(SubscribedEvents.GetFileInfoResponse, (info: FileInfo) => {
			resolve(info);
		})
	})
}

export const isRoomExist = async (roomId: string, socket: Socket): Promise<boolean> => {
	return new Promise((resolve) => {
		socket.emit('isRoomExist', roomId);

		socket.once('isRoomExistResponse' + roomId, (isExist: boolean) => {
			resolve(isExist);
		})
	})
}

export const getDocument = ({
	socket,
	roomId,
	cursorName,
	fileName,
	preloadedCode
}: GetDocumentProps): Promise<GetDocumentReturn> => {
	return new Promise(function(resolve) {
		socket.emit(EmitSocketEvents.GetDoc, roomId, cursorName, fileName, preloadedCode);

		socket.once(SubscribedEvents.GetDocResponse,  function(version: number, doc: string, cursorName: string, updates: any) {
			resolve({
				version,
				doc: Text.of(doc.split("\n")),
				cursorName,
				updates
			});
		});
	});
}

interface PeerExtensionProps {
	socket: Socket
	roomId: string
	startVersion: number
	fileName?: string
}

export const peerExtension = ({
	socket,
	roomId,
	startVersion,
	fileName,
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
			await pushUpdates(socket, roomId, version, updates, fileName ?? '');
			this.pushing = false;
			// Regardless of whether the push failed or new updates came in
			// while it was running, try again if there's updates remaining
			if (sendableUpdates(this.view.state).length) {
				setTimeout(() => {
					this.push()
				}, 100);
			}
		}

		async pull() {
			while (!this.done) {
				const version = getSyncedVersion(this.view.state);
				const updates = await pullUpdates(socket, roomId, version, fileName ?? '');
				const newUpdates = receiveUpdates(this.view.state, updates);
				this.view.dispatch(newUpdates);
			}
		}

		destroy() {
			socket.off(EmitSocketEvents.PullResponse);
			socket.off(`${EmitSocketEvents.PullResponse}${roomId}${fileName}`);
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
