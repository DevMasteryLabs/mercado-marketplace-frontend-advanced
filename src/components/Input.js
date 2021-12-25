

function Input({type, id, label, placeholder, ...rest}) {
    return (
        <div className="form-floating" style={{marginBottom: 10}}>
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest}  />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default Input;