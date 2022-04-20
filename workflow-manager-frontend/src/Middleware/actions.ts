import { SET_LANG } from './constants';

export const setLang = (lang: string) => {
  return {
    type: SET_LANG,
    payload: lang,
  };
};
