//
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IUser} from '../models/IUser'


export const postAPI = createApi({

   // это уникальный ключ что будет определять именно этот сервис
   reducerPath: 'postAPI',

   baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),

   // endpoints это функция что возвращает объект
   // build.query только получает данные то есть гет запрос
   // build.mutation - для изменения данных
   endpoints: (build) => ({

      // и это опять какая то функция что возвращает объект
      // <IUsers[], number> - означает что авто хук - useFetchAllUsersQuery
      // будет возвращать в data - этот тип данных IPost[],
      // а передавать в этот хук - postAPI.useFetchAllUsersQuery(7)
      // мы будем число
      // то есть тут все это типизируем что там потом с хуком будем делать
      fetchAllUsers: build.query<IUser[], number>({

         query: (limit) => ({
            url: `/users`,
            params: {
               _limit: limit
            }
         })

      })

   })

})

// query: (limit: number = 5) - так не вижу смысла делать
// потому что вызвать хук без передачи данных не дает
