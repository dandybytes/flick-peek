import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {debounce} from 'debounce'

import {movieReducer} from './movies/movieReducer'

const rootReducer = combineReducers({
  movies: movieReducer
  // test: testReducer
})

const localStorageKey = '_flick_pick'
const debounceDuration = 1000

const saveToLocalStorage = (state: unknown) => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  } catch (error) {
    console.error('saving to local storage failed: ', error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const storedState = localStorage.getItem(localStorageKey)
    if (storedState == null) return undefined
    return JSON.parse(storedState)
  } catch (error) {
    console.error('failed to retrieve state from local storage: ', error)
    return undefined
  }
}

/**
 * TODO: Local storage state cache should be used only for long-term properties
 * Frequently changing data (e.g. movies currently in theaters) should be retrieved anew...
 * ...from the API rather than cached or be cached for only a reasonably short time (e.g. 24 hours)
 */
const storeFromLocalStorage = loadFromLocalStorage()

export const store = createStore(
  rootReducer,
  storeFromLocalStorage,
  composeWithDevTools(applyMiddleware(thunk))
)

// save the state to local storage and debounce the saving process for better performance
store.subscribe(debounce(() => saveToLocalStorage(store.getState()), debounceDuration))

export type RootState = ReturnType<typeof store.getState>