import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {BsTrash} from 'react-icons/bs'
import {GrEdit} from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

export default function ItemCard({ item, handleShowModal }) {
    const history = useHistory()
    const connectedUserId = useSelector(state => state.user.info && state.user.info._id)

    return (
        <Card onClick={() => history.push(`/items/${item._id}`)} className="item-card shadow-lg cursor-pointer">
            <Card.Img className="fit-image" variant="top border-bottom" src={item.photo} />
            <Card.Body className="d-flex gap-2">
                <div className="card-text flex-grow-1 text-truncate">
                    <Card.Title className="text-start text-truncate"> {item.title} </Card.Title>
                    <Card.Text className="text-start text-truncate"> {item.price} TND </Card.Text>
                </div>
                {connectedUserId && item.user && connectedUserId === item.user._id && (

                    <div className="card-btns d-flex flex-column justify-content-center align-items-end gap-2">
                        <Link onClick={(e) => e.stopPropagation()} to={`/update-item/${item._id}`}>
                            <Button size='sm' variant="outline-dark"><GrEdit className="gr-edit" size={20} /></Button>
                        </Link>
                        <Button size='sm' variant="outline-danger" onClick={(e) => { e.stopPropagation(); handleShowModal(item); }}><BsTrash size={20} /></Button>
                    </div>
                )}
            </Card.Body>
            <Card.Footer className="bg-white">
                <Link onClick={(e) => e.stopPropagation()} to={`/items/${item._id}`}>
                    <Button className="w-100" size='sm' variant="primary">Details</Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}
