import omit from "lodash/omit";
import keyBy from "lodash/keyBy";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
// @types
import { IKanbanState, IKanbanCard, IKanbanColumn } from "../../@types/kanban";
import { IAssigment } from "../services/interfaces/assigment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { AssigmentStatuses } from "../services/enums/assigment-status.enum";

// ----------------------------------------------------------------------

const initialState: IKanbanState = {
  isLoading: false,
  minOrder: 1,
  error: null,
  board: {
    cards: {},
    columns: {},
  },
};

const slice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = keyBy(board.cards, "id");
      const columns = keyBy(board.columns, "id");

      state.board = {
        cards,
        columns,
      };
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[
        columnId
      ].cardIds.filter((id) => id !== cardId);

      state.board.cards = omit(state.board.cards, [cardId]);
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard(data: (IAssigment & BaseResponseInterface)[]) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = {
        board: {
          cards: data,
          columns: [
            {
              id: AssigmentStatuses.BACKLOG,
              name: "BACKLOG",
              cardIds: data
                .filter((d) => d.status === AssigmentStatuses.BACKLOG)
                .sort(
                  (a, b) =>
                    parseFloat(a.meta?.order as string) -
                    parseFloat(b.meta?.order as string)
                )
                .map((d) => d.id),
            },
            {
              id: AssigmentStatuses.PROGRESS,
              name: "PROGRESS",
              cardIds: data
                .filter((d) => d.status === AssigmentStatuses.PROGRESS)
                .sort(
                  (a, b) =>
                    parseFloat(a.meta?.order as string) -
                    parseFloat(b.meta?.order as string)
                )
                .map((d) => d.id),
            },
            {
              id: AssigmentStatuses.DONE,
              name: "DONE",
              cardIds: data
                .filter((d) => d.status === AssigmentStatuses.DONE)
                .sort(
                  (a, b) =>
                    parseFloat(a?.meta?.order as string) -
                    parseFloat(b?.meta?.order as string)
                )
                .map((d) => d.id),
            },
          ],
        },
      };
      dispatch(slice.actions.getBoardSuccess(response.board));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, IKanbanColumn>) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({
  card,
  columnId,
}: {
  card: Partial<IKanbanCard>;
  columnId: string;
}) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({
  cardId,
  columnId,
}: {
  cardId: string;
  columnId: string;
}) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}
