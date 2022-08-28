import React, {useEffect} from 'react'
import './App.css'
import {userSlice} from './store/reducers/UserSlice'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {fetchUsers} from './store/reducers/ActionCreators'
import PostContainer from './components/PostContainer'
import PostContainer2 from './components/PostContainer2'

function App() {


   const dispatch = useAppDispatch()


   //region count

   // const {} = useSelector(state => state.)
   // при использовании обычного ис селектора оно не знает какие там поля
   // при использовании useAppSelector а это
   // useAppSelector: TypedUseSelectorHook<RootState> = useSelector
   // то есть это просто типизированный useSelector - оно знает уже про все поля
   // созданный userSlice и есть типо редьюсер и мы его подключаем в сторе
   // и потом тут state.userReducer - подсказывает

   const {count} = useAppSelector(state => state.userReducer)

   // userSlice.actions - содержит все акшен креаторы
   const {increment} = userSlice.actions
   // вытащили акшен креатор = даже консоль пишет что это function actionCreator()
   // и оно само делает type: "user/increment"
   //console.log(increment)

   //const incrementRes = increment(2)
   // и тут оно нам возвращает объект - { type: "user/increment", payload: 2 }
   //console.log(incrementRes)
   const incrementFoo = () => dispatch(increment(2))
   //endregion


   const {users, isLoading, error} = useAppSelector(state => state.userReducer)

   useEffect(() => {
      dispatch(fetchUsers(1))
   }, [])

   useEffect(() => {
      setTimeout(() => {
         dispatch(fetchUsers(2))
      }, 2000)
   }, [])

   useEffect(() => {
      setTimeout(() => {
         dispatch(fetchUsers(1))
      }, 4000)
   }, [])


   return (
      <div className='container'>
         <div>
            <br />
            просто счетчик с Redux Toolkit createSlice <button onClick={incrementFoo}>increment</button>
            <div className={'display-inline-block'}><h3>{count}</h3></div>
            <div>
               <br />
               <hr />
               <br />
            </div>

            <div>
               // получение с jsonplaceholder.typicode.com/users
            </div>
            <br />
         </div>

         <div className='bg-green'>
            <div>
               <strong>тут делаем с помощью createAsyncThunk запрашиваем сначалo пользователя с id 1 потом через 2 сек
                  пользователя с id 2 и потом еще через 2 сек опять пользователя с id 1 - итого = 3 запроса
               </strong>
            </div>
            <br />
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>{error}</h1>}
            <div className='max-height20'>
               {JSON.stringify(users, null, 2)}
            </div>
         </div>
         <br />

         <div>
            <strong>
               тут делаем с помощью RTK Query
            </strong>
         </div>
         <div style={{display: 'flex'}}>
            <PostContainer />
            <PostContainer2 />
         </div>
      </div>
   )
}

export default App
