// ----------------------------------------------------------------------

import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "@ct-nx/utils";

export interface IAssignments {
  id: string;
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  messageType: "image" | "text";
  message: string;
}

export interface IAssignmentsAssignee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address: string;
  phone: string;
  email: string;
  lastActivity: Date | string;
  status: string;
  role: string;
}

export type IAssignmentsCard = IAssignment & BaseResponseInterface;

export interface IAssignmentsColumn {
  id: string;
  name: string;
  cardIds: string[];
}

export interface IAssignmentsComment {
  id: string;
  name: string;
  createdAt: string;
  messages: [];
  message: string;
  avatar: string;
  messageType: string;
  cardIds: string[];
}

export interface IAssignmentsBoard {
  cards: IAssignmentsCard[];
  columns: IAssignmentsColumn[];
  columnOrder: string[];
}

// ----------------------------------------------------------------------

export interface IAssignmentsState {
  minOrder: number;
  isLoading: boolean;
  error: Error | string | null;
  board: {
    cards: Record<string, IAssignmentsCard>;
    columns: Record<string, IAssignmentsColumn>;
  };
}
