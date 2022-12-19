import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

let store = null;

const defaultState = {
  user: {},
  isLoggedIn: false,
}

export function initStore (forceState) {
  if (store) {
    throw new Error('Store already initialized')
  } else {
    function initState(forceState) {
      let initializedState;

      if (forceState) {
        initializedState = forceState;
      } else {
        const savedState = localStorage.getItem('state');

        if (savedState) {
          initializedState = JSON.stringify(savedState);
        } else {
          initializedState = defaultState;
        }
      }

      return initializedState;
    }

    const saveState = (state) => {
      try {
        const serializedSate = JSON.stringify({
          ...state,
        });

        localStorage.setItem('state', serializedSate);
      } catch (error) {
        console.error(error);
      }
    };

    const loggerMiddleware = () => (next) => (action) => {
      console.log(`STORE:: dispatching "${action.type}"`, action.payload);
      return next(action);
    };

    const composedEnhancer = composeWithDevTools(
      applyMiddleware(loggerMiddleware, createStateSyncMiddleware())
    );

    function rootReducer(state = initState(forceState), action) {
      switch (action.type) {
        case 'user/set': {
          return {
            ...state || {},
            user: action.payload,
          };
        }

        case 'isLoggedIn/set': {
          return {
            ...state || {},
            isLoggedIn: action.payload,
          };
        }

        case 'isLoggedIn/out': {
          return {
            user: {},
            isLoggedIn: false,
          };
        }

        default: {
          return {...state};
        }
      }
    }

    store = createStore(rootReducer, composedEnhancer);

    initMessageListener(store);

    store.subscribe(() => {
      saveState(store.getState());
    });
  }
}

export function getStore() {
  if (!store) {
    initStore();
  }

  return store;
}

export function getState() {
  if (!store) initStore();

  return store.getState();
}
