import axios from 'axios';

import { alertSuccess } from '../../utils/feedback';
import {
    SET_ALL_ITEMS,
    SELECT_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    ADD_ITEM
} from '../types/itemsTypes';
import { requestFailed, requestStarted, requestSucceeded } from './feedbackActionCreators';


export const setAllItems = (items) => ({ type: SET_ALL_ITEMS, payload: items });

export const selectItem = (item) => ({ type: SELECT_ITEM, payload: item });

export const removeItem = (itemId) => ({ type: REMOVE_ITEM, payload: itemId });

export const updateItem = (itemId, data) => ({ type: UPDATE_ITEM, payload: { id: itemId, data } });

export const addItem = (item) => ({ type: ADD_ITEM, payload: item });


export const fetchAllItems = () => {
    return async (dispatch) => {
        dispatch(requestStarted())
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/items`)
            dispatch(requestSucceeded())
            const items = res.data
            dispatch(setAllItems(items))
        } catch (error) {
            dispatch(requestFailed(error.message))
        }
    }
}

export const fetchItemById = (id) => {
    return async (dispatch) => {
        dispatch(requestStarted())
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`)
            dispatch(requestSucceeded())
            const item = res.data
            dispatch(selectItem(item))
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

export const requestCreatingItem = (data, history) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/items`, data, {headers: {authorization: token}})            
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
            }
            if (res.data && res.data.item && res.data.item._id) {
                dispatch(addItem({ ...data, _id: res.data.item._id }))
                history.push('/items')
            }
        } catch (err) {
            console.log({err});
            let errorMessage = err.message || 'Request failed'            
            if (err && err.response && err.response.data && err.response.data.error && typeof(err.response.data.error) === 'string') {
                errorMessage = err.response.data.error
            }
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                errorMessage = err.response.data.error.details[0] && err.response.data.error.details[0].message
            }
            dispatch(requestFailed(errorMessage))
        }
    }
}

export const requestUpdatingItem = (id, data, history) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, data, {headers: {authorization: token}})
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/items')
            }
            dispatch(updateItem(id, data))
        } catch (err) {
            console.log({err});
            let errorMessage = err.message || 'Request failed'
            if (err && err.response && err.response.data && err.response.data.error && typeof(err.response.data.error) === 'string') {
                errorMessage = err.response.data.error
            }
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                errorMessage = err.response.data.error.details[0] && err.response.data.error.details[0].message
            }
            dispatch(requestFailed(errorMessage))
        }
    }
}

export const requestDeletingItem = (itemId) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/items/${itemId}`, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
            }
            dispatch(removeItem(itemId))
        } catch (err) {
            let errorMessage = err.message || 'Request failed'            
            dispatch(requestFailed(errorMessage))
        }
    }
}

