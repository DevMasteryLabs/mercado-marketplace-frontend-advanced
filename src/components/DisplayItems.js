import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Container from 'react-bootstrap/Container'

import DeleteItemModal from './DeleteItemModal'

import { setAllItems, selectItem } from '../redux/actions/itemsActionCreators'
import { alertError } from '../utils/feedback'
import ItemCard from './ItemCard'


function DisplayItems({showOnlyOwnItems}) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.info && state.user.info._id)

    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(selectItem())
    }
    const handleShowModal = (item) => {
        setShowModal(true)
        dispatch(selectItem(item))
    }

    const getItems = async () => {
        try {
            const items = await axios.get(`${process.env.REACT_APP_API_URL}/items`)
            dispatch(setAllItems(items.data))
        } catch (error) {
           alertError(error.message) 
        }
    } 
    useEffect(() => {
        getItems()
    }, [])
    let items = useSelector(state => state.items.all)
    if (showOnlyOwnItems) {
        items = items.filter(item => item.user && item.user._id === userId)
    }
    return (
            <Container>
                <div className="items my-3">
                    {items.map(item => (
                            <ItemCard 
                                key={item._id} 
                                item={item}
                                handleShowModal={handleShowModal}  
                            />                
                       
                    ))}
                </div>
                <DeleteItemModal 
                    showModal={showModal} 
                    handleCloseModal={handleCloseModal} 
                />
            </Container>
    )
}

export default DisplayItems;