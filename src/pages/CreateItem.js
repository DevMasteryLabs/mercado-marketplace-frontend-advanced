import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button'

import Input from "../components/Input";
import { alertError, alertSuccess } from "../utils/feedback";
import { useHistory } from "react-router-dom";


function CreateItem() {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        photo: '',
        price: ''
    })
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            console.log(itemData);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/items`, itemData, {headers: {authorization: token}})
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
        <div className="custom-container">
            <h1>Create Item</h1>
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

export default CreateItem;