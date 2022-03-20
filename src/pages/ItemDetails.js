import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Table from '../components/Table'
import Tr from '../components/Tr'
import { fetchItemById } from '../redux/actions/itemsActionCreators'

export default function ItemDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const selectedItem = useSelector(state => state.items.selected)

    useEffect(() => {
        dispatch(fetchItemById(id))
    }, [dispatch, id])

    return (
        <div className="item-details custom-container text-center">
            {
                selectedItem ? (
                    <>
                        <h1>Item details</h1>
                        <img alt="item-img" className="img-thumbnail image-size mb-3" src={selectedItem.photo} />
                        <Table striped bordered>
                            <Tr title="Reference" description={selectedItem.title} />
                            <Tr title="Description" description={selectedItem.description} />
                            <Tr title="Price" description={`${selectedItem.price} TND`} />
                        </Table>
                    </>
                ) : (
                    <div className='alert alert-danger'>
                        <h3>Item not found</h3>
                    </div>
                )
            }
        </div>
    )
}
