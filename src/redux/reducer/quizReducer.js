const initialState = {
    answer: [],
    scor:0,
    name:null
   };
   
   export const quizReducer = (state = initialState, action) => {
     switch (action.type) {
      case "ADD_ANSWER":
        return {
            ...state,
            answer: [action.payload,...state.answer]
        };
      case "UPDATE_ANSWAR":
        return {
            ...state,
            answer: state.answer.map(answer => answer === action.payload ? action.payload : answer)
        };
         //update contact 
         case "UPDATE_SCOR" : 
         return {
           ...state,
           scor:action.payload
         };
         case "ADD_NAME" : 
         return {
           ...state,
           name:action.payload.name
         };
         //default
       default:
         return state;
     }
   }