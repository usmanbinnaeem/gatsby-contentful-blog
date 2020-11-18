import { createSlice, configureStore} from "@reduxjs/toolkit"

const authontication = createSlice({
  name: "Authontication",
  initialState: {login: false},
  reducers: {
    setLoggedIn: (state, action) => {
        state.login=action.payload
    },
  },
})

const store = configureStore({ reducer: authontication.reducer });

export const { setLoggedIn } = authontication.actions;


export { store, authontication };