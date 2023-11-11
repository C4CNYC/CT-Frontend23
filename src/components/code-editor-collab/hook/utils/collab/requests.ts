import { Socket } from "socket.io-client";
import { EmitSocketEvents, SubscribedEvents } from "../socket";
import { Text } from "@codemirror/state"
import { type Update } from "@codemirror/collab";

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
	updates: Update[]
	docInfo: Record<string, string>
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
