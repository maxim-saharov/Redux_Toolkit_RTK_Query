//
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IPost} from '../models/IPost'


// для работы json-server
export const postAPIJS = createApi({

   reducerPath: 'postAPIJS',

   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),

   tagTypes: ['Post'],


   endpoints: (build) => ({

      fetchAllPostJS: build.query<IPost[], number>({

         query: (limit) => ({
            url: `/posts`,
            params: {
               _limit: limit
            }
         }),

         // так тоже работает
         // наверно если ничего не обрабатываем можно так писать
         //providesTags: ['Post']

         providesTags: result => {
            //console.log(result)
            // здесь весь наш результат запроса с сервера
            // и если нужно то можем его как то обрабатывать
            // смотри документацию по invalidatesTags
            return ['Post']
            // то есть тут указываем что эти данные актуальны
            // типо галку возле тега ставим
         }

      }),


      createPost: build.mutation<IPost, IPost>({
         query: (post) => ({
            // параметр post - этот тот объект что будет уходить вместе с запросом
            url: `/posts`,
            method: 'POST',
            body: post
         }),
         invalidatesTags: ['Post']
         // то есть тут указываем что эти данные уже НЕ актуальны
      }),

      updatePost: build.mutation<IPost, IPost>({
         query: (post) => ({
            url: `/posts/${post.id}`,
            method: 'PUT',
            body: post
         }),
         invalidatesTags: ['Post']
      }),

      deletePost: build.mutation<IPost, IPost>({
         query: (post) => ({
            url: `/posts/${post.id}`,
            method: 'DELETE'
         }),
         invalidatesTags: ['Post']
      })

   })

})

