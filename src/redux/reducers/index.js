import { combineReducers } from 'redux'

import userReducer from './userReducer'
import itemsReducer from './itemsReducer'
import feedbackReducer from './feedbackReducer'


const rootReducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    feedback: feedbackReducer
})

export default rootReducer