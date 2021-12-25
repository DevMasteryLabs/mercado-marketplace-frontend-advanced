import mercadoLogo from '../images/mercado-logo.svg'

function MercadoLogo({...rest}) {
    return (
        <img 
            {...rest}
            src={mercadoLogo} 
            alt="mercado-logo"
        />
    )
}

export default MercadoLogo;