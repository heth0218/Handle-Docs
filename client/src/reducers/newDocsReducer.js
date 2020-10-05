import { FETCH_ALL_DOCS, CREATE_NEW_DOC, FETCH_DOC } from "../actions/types";

const initialState = {
  docs: [],
  selectedDoc: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCS:
      return {
        ...state,
        docs: action.payload,
      };
    case FETCH_DOC:
      return {
        ...state,
        selectedDoc: action.payload,
      };
    case CREATE_NEW_DOC:
      return state;
    default:
      return state;
  }
};

export default reducer;
