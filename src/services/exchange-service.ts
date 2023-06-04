
export default async function getExchangeService(currency : string){
        const response = await fetch(`https://api.vatcomply.com/rates?base=${currency}`)
        return response.json();
    }
