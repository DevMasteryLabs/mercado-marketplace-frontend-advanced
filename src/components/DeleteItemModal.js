import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'

import { requestDeletingItem } from '../redux/actions/itemsActionCreators'

function DeleteItemModal({ showModal, handleCloseModal }) {
    const dispatch = useDispatch()
    const selectedItem = useSelector(state => state.items.selected)
    const handleDelete = async () => {
        dispatch(requestDeletingItem(selectedItem._id))
        handleCloseModal()
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