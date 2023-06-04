import { createContext, useState } from "react";

interface ExchangeContextValue {
    exchangeString: string;
    setExchangeString: (value: string) => void;
}

export const ExchangeContext = createContext<ExchangeContextValue>({
    exchangeString: "",
    setExchangeString: () => { }
});

export const ExchangeProvider = (props: any) => {
    const [exchangeString, setExchangeString] = useState<string>("");

    return (
        <ExchangeContext.Provider value={{ exchangeString, setExchangeString }}>
            {props.children}
        </ExchangeContext.Provider>
    );
}

export default ExchangeProvider;