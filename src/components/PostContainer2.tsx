import React, {useState} from 'react'
import {postAPI} from '../services/PostService'

import PostItemUsers from './PostItemUsers'
import PostItemPost from './PostItemPost'
import {postAPIJS} from '../services/PostServiceJS'
import {IPost} from '../models/IPost'

const PostContainer2 = () => {

   const [limit] = useState(4)

   const fetchAllUsersQuery = postAPI.useFetchAllUsersQuery(limit)

   const {data: users, error, isLoading} = fetchAllUsersQuery


   const {data: posts} = postAPIJS.useFetchAllPostJSQuery(100)
   const [updatePost, {}] = postAPIJS.useUpdatePostMutation()
   const [deletePost, {}] = postAPIJS.useDeletePostMutation()

   const handleRemove = (post: IPost) => {
      deletePost(post)
   }

   const handleUpdate = (post: IPost) => {
      updatePost(post)
   }


   return (
      <div className='post__list'>
         <div>
            <strong>тут данные уже с кеша</strong>
            {isLoading && <h2>Идет загрузка...</h2>}
            {error && <h1>Произошла ошибка при загрузке2</h1>}
            {error && JSON.stringify(error)}

            {users && users.map(post =>
               <PostItemUsers key={post.id} post={post} />
            )}

         </div>

         <div>
            <br />
            <br />
            <hr />
            <br />
         </div>

         <div>
            <strong>
               тут работаем с json-server и можно клацнуть на названии и поменять его
               и при добавлении данных в первой колонке и тут тоже сработает кеш и еще и синхронизация и не будет лишнего запроса
            </strong>
         </div>

         <div className='bg-green'>
            {posts && posts.map(post =>
               <PostItemPost remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
            )}
         </div>
      </div>


   )
}

export default PostContainer2
