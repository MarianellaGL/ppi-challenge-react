import './Footer.scss';

interface Props {
    fromCurrency: string;
    toCurrency: string;
    date: Date;
}

export const Footer = ({ fromCurrency, toCurrency, date, currencies }: Props) => {
    const lastUpdated = new Date(date).toUTCString()

    return (
        <div>
            <div className="footer">
                <p>
                    <a href={`https://www.xe.com/currency/${fromCurrency.toLowerCase()}-${currencies[fromCurrency].name.toLowerCase().replace(' ', '-')}`} target='_blank' >{fromCurrency}</a>
                    <span> to </span>  <a href={`https://www.xe.com/currency/${toCurrency.toLowerCase()}-${currencies[toCurrency].name.toLowerCase().replace(' ', '-')}/`} target='_blank' >{toCurrency}</a>
                    <span> conversion — Last updated {lastUpdated}</span>
                </p>
            </div>
        </div>);
}

