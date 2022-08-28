//
import React, {FC} from 'react'
import {IUser} from '../models/IUser'



interface PostItemProps {
   post: IUser;
}

// rsc и будет автосоздание фк
const PostItemUsers: FC<PostItemProps> = ({post}) => {

   return (
      <div className='post'>
         {post.id} . {post.name}
      </div>
   )
}

export default PostItemUsers



