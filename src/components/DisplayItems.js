import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'

import DeleteItemModal from './DeleteItemModal'
import { selectItem, fetchAllItems } from '../redux/actions/itemsActionCreators'
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
 
    useEffect(() => {
        dispatch(fetchAllItems())
    }, [dispatch])

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