// ----------------------------------------------------------------------

import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export type IAssignments = {
  id: string;
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  messageType: "image" | "text";
  message: string;
};

export type IAssignmentsAssignee = {
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
};

export type IAssignmentsCard = IAssignment & BaseResponseInterface;

export type IAssignmentsColumn = {
  id: string;
  name: string;
  cardIds: string[];
};

export type IAssignmentsComment = {
  id: string;
  name: string;
  createdAt: string;
  messages: [];
  message: string;
  avatar: string;
  messageType: string;
  cardIds: string[];
};

export type IAssignmentsBoard = {
  cards: IAssignmentsCard[];
  columns: IAssignmentsColumn[];
  columnOrder: string[];
};

// ----------------------------------------------------------------------

export type IAssignmentsState = {
  minOrder: number;
  isLoading: boolean;
  error: Error | string | null;
  board: {
    cards: Record<string, IAssignmentsCard>;
    columns: Record<string, IAssignmentsColumn>;
  };
};
