import { Socket } from "socket.io-client";
import { Text } from "@codemirror/state"
import { type Update } from "@codemirror/collab";

import { EmitSocketEvents, SubscribedEvents } from "../socket";

interface GetDocumentProps {
	socket: Socket
	roomId: string
	cursorName: string
	fileName: File
	preloadedCode?: string
	defaultFileName: string
}

interface GetDocumentReturn {
	version: number,
	doc: Text,
	cursorName: string
	updates: Update[]
	docInfo: Record<string, string>
}

export interface File {
  id: string
  name: string
}

export interface FileInfo {
	activeFile: File
	files: File[]
	filesInLayout: File[]
}

interface CreateFile {
	socket: Socket
	fileName: string
	roomId: string
}

export const createFile = async ({
	socket,
	fileName,
	roomId
}: CreateFile): Promise<File> => {
	return new Promise((res, rej) => {
		socket.emit(EmitSocketEvents.CreateFile, { roomId, fileName });

		socket.once(`${SubscribedEvents.CreateFileResponse}${roomId}`, (file: File | null) => {
			if (file != null) {
				res(file);
			} else {
				rej()
			}
		})
	})
}
export const getFileInfo = async (roomId: string, socket: Socket): Promise<FileInfo> => {
	return new Promise((resolve) => {
		socket.emit(EmitSocketEvents.GetFileInfo, roomId, socket.id);

		socket.once(SubscribedEvents.GetFileInfoResponse + socket.id, (info: FileInfo) => {
			resolve(info);
		})
	})
}

export const isRoomExist = async (roomId: string, socket: Socket): Promise<boolean> => {
	return new Promise((resolve) => {
		socket.emit('isRoomExist', roomId, socket.id);

		socket.once('isRoomExistResponse' + roomId + socket.id, (isExist: boolean) => {
			resolve(isExist);
		})
	})
}

export const getDocument = ({
	socket,
  ...other
}: GetDocumentProps): Promise<GetDocumentReturn> => {
	return new Promise(function(resolve) {
		socket.emit(EmitSocketEvents.GetDoc, other);

		socket.once(SubscribedEvents.GetDocResponse,  ({ doc, ...other }) =>  {
			resolve({
				doc: Text.of(doc.split("\n")),
				...other
			});
		});
	});
}

interface GetCodeInfo {
	socket: Socket
	roomId: string
} 

export const getCodeInfo = ({
	socket,
	roomId
}: GetCodeInfo): Promise<any> => {
	return new Promise(function(resolve) {
		socket.emit('getCode', roomId);

		socket.once('getCodeResponse' + roomId,  (data) =>  {
			resolve(data);
		});
	});
}
