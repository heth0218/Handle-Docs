import { FETCH_ALL_DOCS, CREATE_NEW_DOC } from "../actions/types";

const initialState = {
  docs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCS:
      return {
        ...state,
        docs: action.payload,
      };
    case CREATE_NEW_DOC:
      return state;
    default:
      return state;
  }
};

export default reducer;
