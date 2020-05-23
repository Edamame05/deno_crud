import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { IUser } from '../types.ts'
let users = [
  {
    id: '1',
    name: 'user name 1',
    age: '21'
  },
  {
    id: '2',
    name: 'user name 2',
    age: '21'
  },
  {
    id: '3',
    name: 'user name 3',
    age: '21'
  },
]

//@desc Get all users
//@route GET /users
const getUsers = ({ response }: { response: any}) => {
  response.body = {
    success: true,
    data: users
  }
}

//@desc Get a user
//@route GET /users/:id
const getUser = ({ params, response }: { params: {id: string}, response: any}) => {
  const user: IUser | undefined = users.find(u => u.id === params.id)

  if (user) {
    response.status = 200
    response.body = {
      success: true,
      data: user
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No user found'
    }
  }
}

//@desc Add user
//@route Post /users/:id
const addUser = async ({ request, response }: { request: any, response: any}) => {
  const body = await request.body()
  if (!request.hasBody) {
    response.status = 400
    response.body = {
      success: false,
      msg: 'No data'
    }
  } else {
    const user: IUser = body.value
    user.id = v4.generate()
    users.push(user)
    response.status = 201
    response.body = {
      success: true,
      data: users
    }
  }
 }

//@desc Update user
//@route PUT /users/:id
const updateUser = async ({ params, request, response }: { params: {id: string}, request: any, response: any}) => {
  const user: IUser | undefined = users.find(u => u.id === params.id)

  if (user) {
    const body = await request.body()
    const updateData: { name?: string, age?:string } = body.value

    users = users.map(u => u.id === params.id ? { ...u, ...updateData} : u )

    response.status = 200
    response.body = {
      success: true,
      data: users
    }
  } else {
    response.status = 200
    response.body = {
      success: false,
      data: 'no user found'
    }
  }
}

//@desc Delete user
//@route DELETE /users/:id
const deleteUser = ({ params, response }: { params: { id: string }, response: any}) => {
  users = users.filter(u => u.id !== params.id)
  response.body = { 
    success: true,
    msg: 'User removed'
  }
}

export { getUsers, getUser, addUser, updateUser, deleteUser}
