import omit from "lodash/omit";
import keyBy from "lodash/keyBy";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
// @types
import { IKanbanState, IKanbanCard, IKanbanColumn } from "../../@types/kanban";

// ----------------------------------------------------------------------

const initialState: IKanbanState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: []
  }
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
      const { columnOrder } = board;

      state.board = {
        cards,
        columns,
        columnOrder
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter(
        (id) => id !== cardId
      );

      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = {
        "board": {
          "cards": [{
            "id": "deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3",
            "name": "Call with sales of HubSpot",
            "description": "Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.",
            "assignee": [{
              "id": "473d2720-341c-49bf-94ed-556999cf6ef7",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
              "name": "Lucian Obrien"
            }],
            "due": [1676968531186, 1677054931186],
            "attachments": [],
            "comments": [{
              "id": "84d76256-4f78-41e8-8528-5175a39ec1db",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg",
              "name": "Jayvion Simon",
              "createdAt": "2023-02-15T08:35:31.187Z",
              "messageType": "text",
              "message": "Assumenda nam repudiandae rerum fugiat vel maxime."
            }, {
              "id": "f03b2887-55e6-4df2-b37f-82a511769e46",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
              "name": "Lucian Obrien",
              "createdAt": "2023-02-14T07:35:31.187Z",
              "messageType": "text",
              "message": "Quis veniam aut saepe aliquid nulla."
            }, {
              "id": "fe0247a8-84ba-4ce6-aeef-8b8dd42910fd",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
              "name": "Deja Brady",
              "createdAt": "2023-02-13T06:35:31.187Z",
              "messageType": "text",
              "message": "Reprehenderit ut voluptas sapiente ratione nostrum est."
            }, {
              "id": "7e4456d2-232b-40ee-ab6b-63c787178903",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
              "name": "Harrison Stein",
              "createdAt": "2023-02-12T05:35:31.187Z",
              "messageType": "image",
              "message": "https://api-prod-minimal-v4.vercel.app/assets/images/covers/cover_7.jpg"
            }, {
              "id": "3941f5dd-a39d-4ca8-90ec-b25c60c23fe8",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg",
              "name": "Reece Chung",
              "createdAt": "2023-02-11T04:35:31.187Z",
              "messageType": "text",
              "message": "Quo quia sit nihil nemo doloremque et."
            }, {
              "id": "0be995ab-b38f-475f-9997-1fb85dbe08c6",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
              "name": "Lainey Davidson",
              "createdAt": "2023-02-10T03:35:31.187Z",
              "messageType": "image",
              "message": "https://api-prod-minimal-v4.vercel.app/assets/images/covers/cover_9.jpg"
            }, {
              "id": "f79e6751-d707-4361-817f-7dbb83838ae5",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_7.jpg",
              "name": "Cristopher Cardenas",
              "createdAt": "2023-02-09T02:35:31.187Z",
              "messageType": "text",
              "message": "Tempora officiis consequuntur architecto nostrum autem nam adipisci."
            }, {
              "id": "ee312a28-2ddf-45da-a0de-07ed23bde990",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_8.jpg",
              "name": "Melanie Noble",
              "createdAt": "2023-02-08T01:35:31.187Z",
              "messageType": "text",
              "message": "Voluptas sunt magni adipisci praesentium saepe."
            }],
            "completed": true
          }, {
            "id": "98bf6e8b-becc-485b-9c3f-a7d09392c48d",
            "name": "Interview for the Asis. Sales Manager",
            "description": "We are looking for vue experience and of course node js strong knowledge",
            "assignee": [{
              "id": "473d2720-341c-49bf-94ed-556999cf6ef7",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
              "name": "Deja Brady"
            }, {
              "id": "b8395203-887c-46f5-a85f-339b2d75c98b",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
              "name": "Harrison Stein"
            }, {
              "id": "18e23ac9-c874-43e4-8163-2d37f15f3367",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
              "name": "Reece Chung"
            }, {
              "id": "a3be5485-03bf-47a6-b553-a9cf9f070ed8",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg",
              "name": "Lainey Davidson"
            }, {
              "id": "048f6343-7a65-4873-a570-eb6ff4eb1ba3",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
              "name": "Cristopher Cardenas"
            }],
            "due": [1676968531186, 1677054931186],
            "attachments": ["https://api-prod-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg"],
            "comments": [],
            "completed": false
          }, {
            "id": "99fbc02c-de89-4be3-9515-f8bd12227d38",
            "name": "Change the height of the top bar because it looks too chunky",
            "description": "We nede to make it aggressive with pricing because it’s in their interest to acquire us",
            "assignee": [],
            "due": [null, null],
            "attachments": [],
            "comments": [],
            "completed": true
          }, {
            "id": "ab9cebca-6cb4-4847-aa17-3b261b3dd0fb",
            "name": "Integrate Stripe API",
            "description": "We nede to make it aggresive with pricing because it’s in their interest to acquire us",
            "assignee": [{
              "id": "b8395203-887c-46f5-a85f-339b2d75c98b",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
              "name": "Melanie Noble"
            }, {
              "id": "a3be5485-03bf-47a6-b553-a9cf9f070ed8",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
              "name": "Chase Day"
            }],
            "due": [null, null],
            "attachments": ["https://api-prod-minimal-v4.vercel.app/assets/images/covers/cover_4.jpg"],
            "comments": [],
            "completed": false
          }, {
            "id": "ebf0d26a-78e5-414f-986f-003d8fcd3154",
            "name": "Update the customer API for payments",
            "description": "We need to make it aggresive with pricing because it’s in their interest to acquire us",
            "assignee": [{
              "id": "473d2720-341c-49bf-94ed-556999cf6ef7",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
              "name": "Shawn Manning"
            }],
            "due": [null, null],
            "attachments": [],
            "comments": [],
            "completed": true
          }, {
            "id": "9d98ce30-3c51-4de3-8537-7a4b663ee3af",
            "name": "Release minimals DS",
            "description": "Production",
            "assignee": [{
              "id": "473d2720-341c-49bf-94ed-556999cf6ef7",
              "avatar": "https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
              "name": "Soren Durham"
            }],
            "due": [null, null],
            "attachments": [],
            "comments": [],
            "completed": true
          }],
          "columns": [{
            "id": "8cd887ec-b3bc-11eb-8529-0242ac130003",
            "name": "Backlog",
            "cardIds": ["deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3", "98bf6e8b-becc-485b-9c3f-a7d09392c48d", "99fbc02c-de89-4be3-9515-f8bd12227d38"]
          }, {
            "id": "23008a1f-ad94-4771-b85c-3566755afab7",
            "name": "In Progress",
            "cardIds": ["ab9cebca-6cb4-4847-aa17-3b261b3dd0fb", "ebf0d26a-78e5-414f-986f-003d8fcd3154"]
          }, { "id": "165e1645-3b65-47fd-97b1-5d46ce12451f", "name": "Done", "cardIds": [] }],
          "columnOrder": ["8cd887ec-b3bc-11eb-8529-0242ac130003", "23008a1f-ad94-4771-b85c-3566755afab7",  "165e1645-3b65-47fd-97b1-5d46ce12451f"]
        }
      };
      dispatch(slice.actions.getBoardSuccess(response.board));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn: { name: string }) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("https://api-dev-minimal-v4.vercel.app/api/kanban/columns/new", newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, column: IKanbanColumn) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("https://api-dev-minimal-v4.vercel.app/api/kanban/columns/update", {
        columnId,
        column
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post("https://api-dev-minimal-v4.vercel.app/api/kanban/columns/delete", { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder: string[]) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.persistColumn(newColumnOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, IKanbanColumn>) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, columnId }: { card: Partial<IKanbanCard>; columnId: string }) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId }: { cardId: string; columnId: string }) {
  return (dispatch: Dispatch) => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}
