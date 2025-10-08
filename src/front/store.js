export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],

    characters: [],
    planets: [],
    species: [],
    user: null,     /* you can use also user: {} cause it would be an object not an array but null is more functional */
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'set_characters':

      return {
        ...store,
        characters: action.payload
      }

    case 'set_planets':

      return {
        ...store,
        planets: action.payload
      }

    case 'set_species':

      return {
        ...store,
        species: action.payload
      }

      case 'set_user':

      return {
        ...store,
        user: action.payload
      }

      case 'log_out_user':

      localStorage.removeItem("authToken")

      return {
        ...store,
        user: null
      }

    default:
      throw Error('Unknown action.');
  }    
}
