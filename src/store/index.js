import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './../reducers'; // the value from combineReducers
import thunk from 'redux-thunk';


const middleware = [
    thunk,
    logger
  ]
// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
// export const persistor = persistStore(store);