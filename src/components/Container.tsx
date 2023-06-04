import { Header } from "./Header/Header";
import './Container.scss';
import { useContext } from 'react';
import { ConverterText } from "./ConverterText/ConverterText";
import { ConvertComponent } from "./ConverterComponent/ConvertComponent";
import ExchangeProvider, { ExchangeContext } from "../context/exchangeContext";

export const Container = () => {
    const { exchangeString, setExchangeString } = useContext(ExchangeContext);

    return (
        <>
            <ExchangeProvider value={{ exchangeString, setExchangeString }}>
                <Header />
                <ConverterText />
                <ConvertComponent />
            </ExchangeProvider>
        </>
    );
};
