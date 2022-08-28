//
import {IUser} from '../../models/IUser'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchUsers} from './ActionCreators'

interface UserState {
   users: IUser[];
   isLoading: boolean;
   error: string;
   count: number;
}

const initialState: UserState = {
   users: [],
   isLoading: false,
   error: '',
   count: 0

}

// слайс это некоторая обвертка над редьюсером
export const userSlice = createSlice({
   name: 'user',
   initialState,

   reducers: {
      // аналогично свитч кейс как в обычном редьюсере !!!
      // и тут мы создаем функции внутри который изменяем состояние
      // и они принимают стайт и акшены - типо как в обычном редаксе
      // но тут мы спокойно все меняем так как тут типо библиотека inner js встроена
      // под капотом
      increment(state, action: PayloadAction<number>) {
         state.count += action.payload
      }
      // это использовали раньше когда писали классический thunkMiddleWare
      // usersFetching(state) {
      //    state.isLoading = true
      //
      // },
      // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      //    state.isLoading = false
      //    state.error = ''
      //    state.users = action.payload
      //
      // },
      // usersFetchingError(state, action: PayloadAction<string>) {
      //    state.isLoading = false
      //    state.error = action.payload
      // }

   },

   extraReducers: {

      [fetchUsers.pending.type]: (state) => {
         state.isLoading = true
      },

      [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
         state.isLoading = false
         state.error = ''
         state.users = action.payload
      },

      [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
         state.isLoading = false
         state.error = action.payload
      }
   }
})

// после создания слайса можем с него вытянуть редьюсеры и акшен креаторы из них
export default userSlice.reducer
