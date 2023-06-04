import 'bootstrap/dist/css/bootstrap.css';
import './ConvertComponent.scss';
import { useEffect, useState, useContext } from 'react';
import { BarLoader } from 'react-spinners';
import { Footer } from '../Footer/Footer';
import getCurrenciesService from '../../services/currency-service';
import getRatesService from '../../services/exchange-service';
import { ExchangeContext } from '../../context/exchangeContext';

interface Currencies {
    [currency: string]: Currency
}

interface Currency {
    name: string
    symbol: string
}


export const ConvertComponent = () => {
    const { exchangeString, setExchangeString } = useContext(ExchangeContext);

    const [currencies, setCurrencies] = useState<Currencies>({});
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("EUR");
    const [amount, setAmount] = useState<number>(1)

    const [rate, setRate] = useState(0);
    const [date, setDate] = useState();

    const [currenciesLoading, setCurrenciesLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const getCurrencies = async () => {
            setLoading(true)
            setCurrencies(await getCurrenciesService())

            setLoading(false)
            setCurrenciesLoading(false)
        };
        getCurrencies()
    }, [])

    useEffect(() => {
        const getRates = async () => {
            setError(undefined)
            setLoading(true)
            try {
                const response = await getRatesService(fromCurrency);
                setDate(response.date);

                if (!(toCurrency in response.rates)) {
                    setError(`Server error. Cannot retrieve rates for ${toCurrency} `)
                } else {
                    setRate(response.rates[toCurrency]);
                }
            } catch (error) {
                setError(`Server error. Cannot retrieve rates for ${fromCurrency} `)
            }
            setLoading(false)
        };
        getRates();

        if (!loading) {
            setExchangeString(`Convert ${amount.toString()} ${fromCurrency} to ${toCurrency} - Convert ${currencies[fromCurrency].name} to ${currencies[toCurrency].name}`)
        }

    }, [amount, fromCurrency, toCurrency, currencies, setExchangeString])

    if (currenciesLoading) {
        return <></>
    }

    const switchCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    };

    const currencyOptions = Object.keys(currencies).map((currency) => <option key={currency} value={currency}>
        {(currencies as Currencies)[currency].name}
    </option>)

    return (
        <div className="card-container">
            <div className="card">
                <div className="loading">
                    {loading && <BarLoader color="#1a8dff" width="100%" />}
                </div>
                <div className="card-body">
                    <div className="form">
                        <div className="form-group">
                            <label >Amount</label>
                            <input type="number" className="form-control" min="0" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 1)} />
                        </div>

                        <div className="form-group">
                            <label>From</label>
                            <select className="dropdown-convert-from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                                {currencyOptions}
                            </select>
                        </div>
                        <div className="form-group image-container flex-shrink-1">
                            <input type="image" src="src/assets/Ellipse1.svg" onClick={switchCurrencies} />
                        </div>
                        <div className="form-group">
                            <label>To</label>
                            <select className="dropdown-convert" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                                {currencyOptions}
                            </select>
                        </div>
                    </div>
                </div>
                {!error && <div className="card-body-wording">
                    <h3>{`${amount} ${currencies[fromCurrency].name} =`}</h3>
                    <h3>{`${(amount * rate).toFixed(7)} ${currencies[toCurrency].name}`}</h3>
                    <span>{`${1} ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`}</span>
                </div>}
                {error && <div className="error">{error}</div>}

                <div className="d-flex justify-content-end">
                    <div className="card-body-disclaimer">
                        <p>We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.</p>
                    </div>
                </div>

                <Footer fromCurrency={fromCurrency} toCurrency={toCurrency} currencies={currencies} date={date} />
            </div>
        </div>
    );
};