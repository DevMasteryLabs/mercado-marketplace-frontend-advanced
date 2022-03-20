import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import { requestCreatingItem } from "../redux/actions/itemsActionCreators";


function CreateItem(props) {
    console.log({ props });
    const dispatch = useDispatch()
    const history = useHistory()
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        photo: '',
        price: ''
    })
    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(requestCreatingItem(itemData, history))
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