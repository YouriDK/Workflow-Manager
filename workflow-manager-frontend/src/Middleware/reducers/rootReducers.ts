import { combineReducers } from 'redux';
import { langReducer } from './reducer';

const rootReducer = combineReducers({ lang: langReducer });

export default rootReducer;
