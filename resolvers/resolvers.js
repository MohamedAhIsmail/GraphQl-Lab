import todoQueries from "./todos/queries.js";
import todoMutations from "./todos/mutations.js";
import userQueries from "./users/queries.js";
import userMutations from "./users/mutations.js";



const resolvers = {
  Query: {
    ...userQueries,
    ...todoQueries,
  },
  Mutation: {
    ...userMutations,
    ...todoMutations,
  },
};

export default resolvers;