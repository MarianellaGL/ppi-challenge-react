
export default async function getCurrencyService(){
        const response = await fetch(`https://api.vatcomply.com/currencies`);
        return response.json();
    }
