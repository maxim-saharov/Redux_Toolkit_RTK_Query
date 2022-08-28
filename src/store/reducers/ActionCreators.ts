import {AppDispatch} from '../store'
import axios from 'axios'
import {IUser} from '../../models/IUser'
import {userSlice} from './UserSlice'
import {createAsyncThunk} from '@reduxjs/toolkit'


// thunkMiddleWare уже под капотом идет и этот способ как бы старый
// export const fetchUsersOld = () => async (dispatch: AppDispatch) => {
//    try {
//
//       // userSlice.actions - содержит все акшен креаторы
//       dispatch(userSlice.actions.usersFetching())
//
//       const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//
//       dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//
//    } catch (e) {
//       dispatch(userSlice.actions.usersFetchingError(e.message))
//    }
// }


// createAsyncThunk это как бы новая фича что бы не писать так много кода как выше
// и тут мы ничего не диспачим - оно само понимает через поле внутри слайса - а именно extraReducers
// и когда мы используем createAsyncThunk - он сам создает нам три состояния
// [fetchUsers.pending.type]: и [fetchUsers.fulfilled.type]: и [fetchUsers.rejected.type]
// и сам из в слайсе отрабатывает
// смотри их в слайсе и по имени fetchUsers как бы само их распознает

export const fetchUsers = createAsyncThunk('user/fetchAll',

   async (userId: number, thunkAPI) => {

      try {
         const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users/${userId}`)
         return response.data

      } catch (e) {
         console.log(e)
         return thunkAPI.rejectWithValue(e.message)
      }
   }
)
