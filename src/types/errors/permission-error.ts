import { SocketError } from "./socket-error";

export interface PermissionError extends SocketError {
  error: "PERMISSION_ERROR";
}
