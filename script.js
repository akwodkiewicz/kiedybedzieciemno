/** 🇵🇱 Piszę poprawnie po polsku 🇵🇱 */

const zdobądźLokalizacjęUżytkownika = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const zdobądźDatęZajściaSłońca = async (szerokość, długość) => {
    const data = new Date();
    const sformatowanaData = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
    const adres = `https://api.sunrise-sunset.org/json?lat=${szerokość}&lng=${długość}&date=${sformatowanaData}&formatted=0`;
    const odpowiedź = await fetch(adres);
    const treśćOdpowiedzi = await odpowiedź.json();
    console.log('treśćOdpowiedzi:', treśćOdpowiedzi)
    return new Date(treśćOdpowiedzi.results.sunset);
}

/** @param data {Date} */
const ustawGodzinęWHtmlu = (data) => {
    if (new Date() > data) {
        document.getElementById('zdanie').innerHTML = 'Jest już ciemno od';
    } else {
        document.getElementById('zdanie').innerHTML = 'Dzisiaj będzie ciemno od';
    }
    document.getElementById('godzina').innerHTML = data.toLocaleTimeString();
}

const głównaFunkcja = async () => {
    const lokalizacja = (await zdobądźLokalizacjęUżytkownika()).coords;
    console.log('dokładność:', lokalizacja.accuracy, 'm');
    console.log('szerokość:', lokalizacja.latitude);
    console.log('długość:', lokalizacja.longitude);
    const dataZajściaSłońca = await zdobądźDatęZajściaSłońca(lokalizacja.latitude, lokalizacja.longitude);
    ustawGodzinęWHtmlu(dataZajściaSłońca);
}

głównaFunkcja().then(() => {}).catch(bł => console.error(bł));

/** **** *** */
