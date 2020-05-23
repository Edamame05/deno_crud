import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser, addUser, updateUser, deleteUser } from './controllers/users.ts'
const router = new Router()

// router.get('/users', ({response}: { response: any}) => {
//   response.body = 'hello world'
// })

router.get('/users', getUsers)
      .get('/users/:id', getUser)
      .post('/users', addUser)
      .put('/users/:id', updateUser)
      .delete('/users/:id', deleteUser)
      
export default router