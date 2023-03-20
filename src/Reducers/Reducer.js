import { ADD_DATA, DELETE_DATA, EDIT_DATA } from "./../action/ActionConstant";

const initialState = {
  productData: [],
};

const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return { ...state, productData: [...state.productData, action.payload] };

    case EDIT_DATA:
      const arr = state.productData;
      for (let i = 0; i < arr.length; i++) {
        if (i === action.payload.index) {
          state.productData[i] = action.payload.data;
          return { productData: [...state.productData] };
        }
      }
      break;

    case DELETE_DATA:
      const deleteRows = state.productData;
      deleteRows.splice(action.payload.id, 1);
      return { productData: [...state.productData] };

    default:
      return state;
  }
};

export default listReducers;
