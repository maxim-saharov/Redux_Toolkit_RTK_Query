//
import React, {FC} from 'react'
import {IPost} from '../models/IPost'

interface PostItemProps {
   post: IPost;
   remove: (post: IPost) => void;
   update: (post: IPost) => void;
}

interface PostItemProps {
   post: IPost;
}

// rsc и будет автосоздание фк
const PostItemUsers: FC<PostItemProps> = ({post, remove, update}) => {

   const handleRemove = (event: React.MouseEvent) => {
      event.stopPropagation()
      // Прекращает дальнейшую передачу текущего события.
      // в нашем случаи перебиваем prompt()
      remove(post)
   }

   const handleUpdate = () => {
      const title = prompt() || 'строка'
      update({...post, title})
   }

   return (
      <div className='post' onClick={handleUpdate}>
         {post.id}. {post.title}
         <button onClick={handleRemove}>Delete</button>
      </div>
   )
}


export default PostItemUsers



