import { useContext } from "react";
import { SocketContext } from "../context/socket-context";

export function useSocket() {
  return useContext(SocketContext)
}
