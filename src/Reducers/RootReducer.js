import { combineReducers } from "redux"; 
import listReducers from "./Reducer";

const reducers = combineReducers({
  list: listReducers,
});

export default reducers;