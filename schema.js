const schema = `

type User {
  _id: ID!
  name: String!
  email: String!
  role: String
}

type Todo {
  _id: ID!
  title: String!
  status: String
  userId: ID!
}

type Query {
getAllUsers: [User]
getUserById(id: ID!): User
getAllTodos: [Todo]
getTodosByUserId(userId: ID!): [Todo]
getTodoById(id: ID!): Todo
}

type Mutation {
  register(user: newUser!): User
  login(user: loggedUser!): String
  add(todo: addTodo!): Todo
  update(id: ID!, todo: updateTodo!): Todo
  delete(id: ID!): Todo
}

input newUser {
  name: String!
  email: String!
  password: String!
  role: String
}

input loggedUser {
  email: String!
  password: String!
}

input addTodo {
  title: String!
  status: String
  userId: ID
}

input updateTodo {
  id: ID
  title: String
  status: String
  userId: ID
}
`;

export default schema;