import { Dispatch, createSlice } from "@reduxjs/toolkit";
import keyBy from "lodash/keyBy";
import omit from "lodash/omit";

import { BaseResponseInterface } from "@utils";

import { ILesson } from "../interfaces/content.interface";

// ----------------------------------------------------------------------

export interface IAssignmentsState {
  minOrder: number;
  isLoading: boolean;
  error: Error | string | null;
  board1: {
    cards: Record<string, ILesson & BaseResponseInterface>;
    columns: Record<string, { cardIds: string[]; id: string }>;
  };
}

const initialState: IAssignmentsState = {
  isLoading: false,
  minOrder: 1,
  error: null,
  board1: {
    cards: {},
    columns: {},
  },
};

const slice = createSlice({
  name: "module-lessons",
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
    getLessonBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = keyBy(board.cards, "id");
      const columns = keyBy(board.columns, "id");

      state.board1 = {
        cards,
        columns,
      };
    },

    persistLessonCard(state, action) {
      const columns = action.payload;
      state.board1.columns = columns;
    },

    // addTask(state, action) {
    //   const { card, columnId } = action.payload;

    //   state.board.cards[card.id] = card;
    //   state.board.columns[columnId].cardIds.push(card.id);
    // },

    // deleteTask(state, action) {
    //   const { cardId, columnId } = action.payload;

    //   state.board.columns[columnId].cardIds = state.board.columns[
    //     columnId
    //   ].cardIds.filter((id) => id !== cardId);

    //   state.board.cards = omit(state.board.cards, [cardId]);
    // },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getLessonsBoard(data: Array<ILesson & BaseResponseInterface>) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(slice.actions.startLoading());
    const copy = [...data];
    try {
      const board1 = {
        cards: data,
        columns: [
          {
            id: "contents",
            name: "contents",
            cardIds: copy
              .sort((a, b) => {
                // return a?.meta.order - b?.meta.order;
                return a - b;
              })
              .map((d) => d.id),
          },
        ],
      };
      dispatch(slice.actions.getLessonBoardSuccess(board1));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, any>) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.persistLessonCard(columns));
  };
}
