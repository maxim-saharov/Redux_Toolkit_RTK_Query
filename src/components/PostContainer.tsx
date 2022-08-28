import React, {useEffect, useState} from 'react'
import {postAPI} from '../services/PostService'
import {IPost} from '../models/IPost'
import PostItemUsers from './PostItemUsers'
import PostItemPost from './PostItemPost'
import {postAPIJS} from '../services/PostServiceJS'

const PostContainer = () => {

   const [limit, setLimit] = useState(4)
   // авто генерация хуков на основании имя ендпоинта - тоесть fetchAllUsers
   // + метод - Query или Mutation
   // если метод квери то нам он отдает сразу объект
   // с данными - data: posts, error, isLoading, refetch и т.д.
   // тот как бы хук хранит свое мини состояние
   // - типо как свое состояние формик сам по себе хранит внутри
   // и тут сразу параметр в хук передаем и потом он будет использоваться в запросе

   //const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllUsersQuery(limit)

   const fetchAllUsersQuery = postAPI.useFetchAllUsersQuery(limit
      // {pollingInterval: 1000}
      // это будет делать запрос каждую секунду!
   )
   //console.log(fetchAllUsersQuery)
   const {data: users, error, isLoading, refetch} = fetchAllUsersQuery

   const {data: posts} = postAPIJS.useFetchAllPostJSQuery(100)

   // и когда Mutation уже массив возвращается где первый элемент это функция
   // а второй это объект как и в Query запросе где data, error и т.д.

   // const [createPost, {}] = postAPIJS.useCreatePostMutation({
   //    // selectFromResult - тут можем получить селектор и делать какой то отбор
   // })

   // так меняем переменную что бы не было конфликта с названием выше
   const [createPost, {error: createError}] = postAPIJS.useCreatePostMutation()

   const [updatePost, {}] = postAPIJS.useUpdatePostMutation()
   const [deletePost, {}] = postAPIJS.useDeletePostMutation()

   const handleCreate = async () => {
      const title = prompt()
      // prompt() вызывает нативное окно куда можно ввести данные

      const valueBody = {title, body: title}

      // передаем наше тело запроса
      await createPost(valueBody as IPost)
   }

   const handleRemove = (post: IPost) => {
      deletePost(post)
   }

   const handleUpdate = (post: IPost) => {
      updatePost(post)
   }

   useEffect(() => {
      setTimeout(() => {
         setLimit(2)
      }, 2000)
   }, [])

   useEffect(() => {
      setTimeout(() => {
         setLimit(4)
      }, 4000)
   }, [])

   return (
      <div className='post__list'>
         <div>

            <div>
               <strong>
                  тут запрашиваем сначалo 4 элемента потом через 2 сек
                  2 элемента и потом еще через 2 сек опять 4 элемента - итого = 2 запроса
               </strong>
            </div>
            {isLoading && <h2>Идет загрузка...</h2>}
            {error && <h1>Произошла ошибка при загрузке2</h1>}
            {error && JSON.stringify(error)}

            {users && users.map(post =>
               <PostItemUsers key={post.id} post={post} />
            )}
            <br />
            <button onClick={() => refetch()}>
               refetch = принудительно перезапросить
            </button>
            <div>
               <br />
               <hr />
            </div>

            <div>
               <br />
            </div>

            <div>
               <strong>
                  тут работаем с json-server и можно клацнуть на названии и поменять его
               </strong>
            </div>

            <div className='bg-green'>
               {posts && posts.map(post =>
                  <PostItemPost remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
               )}
            </div>

            <button onClick={handleCreate}>Add new post</button>
            {createError && <h2>Произошла ошибка при создании поста!</h2>}


         </div>
      </div>
   )
}

export default PostContainer
