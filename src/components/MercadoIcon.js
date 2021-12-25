import mercadoIcon from '../images/mercado-icon.svg';

function MercadoIcon({...rest}) {
    return (
        <img 
            {...rest}
            src={mercadoIcon} 
            alt="mercado-icon"
        />
    )
}

export default MercadoIcon;