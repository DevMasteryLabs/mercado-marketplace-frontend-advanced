import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button'

import Input from "../components/Input";
import { alertError, alertSuccess } from "../utils/feedback";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


function UpdateItem() {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    const {id} = useParams()
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        photo: '',
        price: ''
    })
    const getItemById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`)
            const {title, description, photo, price} = res.data
            setItemData({title, description, photo, price})
        } catch (error) {
            alertError(error.message) 
        }
    }
    useEffect(() => {
        getItemById(id)
    }, [id])
    
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            console.log(itemData);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, itemData, {headers: {authorization: token}})
            console.log({res});
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/items')
            }
        } catch (err) {
            console.log({err});
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                return alertError(err.response.data.error.details[0] && err.response.data.error.details[0].message)
            }
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }
    }
    function handleChange(e) {
        setItemData(prevItemData => ({...prevItemData, [e.target.name]: e.target.value}))
    }
    return (
        <div>
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    label='Title'
                    value={itemData.title}
                    name='title'
                    onChange={handleChange}
                />
                <Input 
                    label='Description'
                    value={itemData.description}
                    name='description'
                    onChange={handleChange}
                />
                <Input 
                    label='Photo URL'
                    value={itemData.photo}
                    name='photo'
                    onChange={handleChange}
                />
                <Input 
                    label='Price (TND)'
                    value={itemData.price}
                    name='price'
                    onChange={handleChange}
                    type='number'
                />
                <Button type="submit" style={{width: '100%'}}>Add</Button>
            </form>
        </div>
    )
}

export default UpdateItem;