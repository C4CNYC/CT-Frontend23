import { Socket } from "socket.io-client";
import { EmitSocketEvents, SubscribedEvents } from "../socket";
import { Text } from "@codemirror/state"
import { type Update } from "@codemirror/collab";

interface GetDocumentProps {
	socket: Socket
	roomId: string
	cursorName: string
	fileName: File
	preloadedCode?: string
	defaultFileName: string
	mode: string
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

export const getFileInfo = async (roomId: string, socket: Socket, mode: string): Promise<FileInfo> => {
	return new Promise((resolve) => {
		console.log(`file info request sent. Role-${mode} roomId-${roomId}
		
		`)
		socket.emit(EmitSocketEvents.GetFileInfo, roomId, socket.id);

		socket.once(SubscribedEvents.GetFileInfoResponse + socket.id, (info: FileInfo) => {
			console.log(`file info response success. Role-${mode} roomId-${roomId}
			
			`);
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
	mode,
  ...other
}: GetDocumentProps): Promise<GetDocumentReturn> => {
	return new Promise(function(resolve) {
		console.log(`get doc request sent. Role-${mode} roomId-${other.roomId}
		
		`);
		socket.emit(EmitSocketEvents.GetDoc, other);

		socket.once(SubscribedEvents.GetDocResponse,  ({ doc, ...other }) =>  {
			console.log(`get doc request success. Role-${mode} roomId-${other.roomId}. Props:`, {doc, ...other});
			console.log(`
			
			`);
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
