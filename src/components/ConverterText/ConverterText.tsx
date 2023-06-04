import { useContext } from 'react';
import { ExchangeContext } from '../../context/exchangeContext';
import './ConverterText.scss';


export const ConverterText = () => {
    const { exchangeString } = useContext(ExchangeContext)

    return (
        <><div className="text-convert">{exchangeString}</div> </>
    )
}