//
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import {postAPI} from '../services/PostService'
import {postAPIJS} from '../services/PostServiceJS'


// это корневой редьюсер - тоесть список редьсеров здесь
// можно просто как обычный объект создать
const rootReducer = combineReducers({
   // это userSlice.reducer
   userReducer,

   // имя берем ключ что сделали и значение оно само нам создало редьюсер
   // при помощи встроенного метода createApi
   [postAPI.reducerPath]: postAPI.reducer,
   [postAPIJS.reducerPath]: postAPIJS.reducer
})

// тут конфигурируем наше редакс хранилище
// и мидлвеер тут уже встроенный по умолчанию
export const setupStore = () => {

   return configureStore({

      reducer: rootReducer,

      // это и есть подключения дефолтного мидлвеера
      // - под капотом идет redux thunk
      // и тут мы добавляем наш postAPI.middleware
      // что система сама сделала при создании нашего postAPI
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware()
            .concat(postAPI.middleware, postAPIJS.middleware)
   })

}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
