import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISchoolSettings {
  language: string;
  marketplace_content_allowed: boolean;
  github_login_allowed: boolean;
  google_login_allowed: boolean;
  invite_only: boolean;
  last_name_only: boolean;
  chat_allowed: boolean;
  gallery_allowed: boolean;
  global_gallery_allowed: boolean;
  school_id?: string;
}

const initialState: ISchoolSettings = {
  language: "en",
  marketplace_content_allowed: false,
  github_login_allowed: false,
  google_login_allowed: false,
  invite_only: false,
  last_name_only: false,
  chat_allowed: true,
  gallery_allowed: true,
  global_gallery_allowed: true,
  school_id: "",
};

export const schoolSettingsSlice = createSlice({
  name: "schoolSettings",
  initialState,
  reducers: {
    setSchoolSettings: (state, action: PayloadAction<ISchoolSettings>) => {
      state.gallery_allowed = action.payload.chat_allowed;
      state.last_name_only = action.payload.last_name_only;
    },
    setSchoolId: (state, action: PayloadAction<string>) => {
      state.school_id = action.payload;
    },
  },
});
export const { setSchoolSettings, setSchoolId } = schoolSettingsSlice.actions;

export default schoolSettingsSlice.reducer;
