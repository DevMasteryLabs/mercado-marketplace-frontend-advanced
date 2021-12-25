import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { alertError } from '../utils/feedback'

import Table from '../components/Table'
import Tr from '../components/Tr'

export default function ItemDetails() {
    const { id } = useParams()
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        photo: '',
        price: ''
    })
    const getItemById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`)
            const { title, description, photo, price } = res.data
            setItemData({ title, description, photo, price })
        } catch (error) {
            alertError(error.message)
        }
    }
    useEffect(() => {
        getItemById(id)
    }, [id])

    return (
        <div className="item-details custom-container text-center">
            <h1>Item details</h1>
            {
                itemData.title && (
                    <>
                        <img alt="item-img" className="img-thumbnail image-size mb-3" src={itemData.photo} />
                        <Table striped bordered>
                            <Tr title="Reference" description={itemData.title} />
                            <Tr title="Description" description={itemData.description} />
                            <Tr title="Price" description={`${itemData.price} TND`} />
                        </Table>
                    </>
                )
            }
        </div>
    )
}
