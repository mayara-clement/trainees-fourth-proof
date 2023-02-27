import { createStore } from 'redux';

const INITIAL_STATE: any = {
  data: null,
  selectedStateIstrue: false
}


function dataInfo(state = INITIAL_STATE, action: any){
  switch (action.type){
    case  'ADD_STATE':
      return { ...state, data: action.payload };

    case  'TOGGLE_SELECTED_STATE':
      return { ...state, selectedState: action.payload };

    default:
      return state;
  }
}


const store = createStore(dataInfo);

export default store;