import BsTable from 'react-bootstrap/Table'


function Profile({ children, ...rest }) {
    return (
        <BsTable {...rest}>
            <tbody>
                {children}
            </tbody>
        </BsTable>
    )
}

export default Profile;