import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'

import { alertError, alertSuccess } from '../utils/feedback'
import { removeItem } from '../redux/actions/itemsActionCreators'

function DeleteItemModal({ showModal, handleCloseModal }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const selectedItem = useSelector(state => state.items.selected)
    const handleDelete = async (item) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/items/${item._id}`, { headers: { authorization: token } })
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                dispatch(removeItem(item._id))
                handleCloseModal()
            }
        } catch (err) {
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }
    }
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header className="border-bottom-0" closeButton>
                <Modal.Title className="text-danger">Delete item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">Are you sure that you wanna delete the item <b>{selectedItem && selectedItem.title}</b> ?</Modal.Body>
            <Modal.Footer className="border-top-0">
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
            </Button>
                <Button variant="danger" onClick={() => handleDelete(selectedItem)}>
                    Delete
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteItemModal