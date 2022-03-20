import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import { fetchItemById, requestUpdatingItem } from "../redux/actions/itemsActionCreators";

function UpdateItem() {
    const history = useHistory()
    const selectedItem = useSelector(state => state.items.selected)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        photo: '',
        price: ''
    })
    useEffect(() => {
        if (selectedItem) {
            setItemData(selectedItem)
        }
    }, [selectedItem])

    useEffect(() => {
        dispatch(fetchItemById(id))
    }, [dispatch, id])
    
    async function handleSubmit(e) {
        e.preventDefault()
        const { title, description, photo, price } = itemData
        dispatch(requestUpdatingItem(id, { title, description, photo, price }, history))        
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
                <Button type="submit" style={{width: '100%'}}>Update</Button>
            </form>
        </div>
    )
}

export default UpdateItem;