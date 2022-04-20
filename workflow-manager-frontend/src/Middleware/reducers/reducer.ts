import { SET_LANG } from '../constants';

const INITIAL_STATE = {
  lang: 'FR',
};

export const langReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};
