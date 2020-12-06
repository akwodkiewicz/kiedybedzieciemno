/** 🇵🇱 Piszę poprawnie po polsku 🇵🇱 */

const zdobądźLokalizacjęUżytkownika = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const zdobądźDatęZmierzchuCywilnego = async (długość, szerokość) => {
    const adres = `https://api.sunrise-sunset.org/json?lat=${szerokość}&lng=${długość}&formatted=0`;
    const odpowiedź = await fetch(adres);
    const treśćOdpowiedzi = await odpowiedź.json();
    console.log('treśćOdpowiedzi:', treśćOdpowiedzi)
    return new Date(treśćOdpowiedzi.results.civil_twilight_end);
}

/** @param data {Date} */
const ustawGodzinęWHtmlu = (data) => {
    document.getElementById('zdanie').innerHTML = 'Dzisiaj będzie ciemno od';
    document.getElementById('czas-zmierzchu-cywilnego').innerHTML = data.toLocaleTimeString();
}

const głównaFunkcja = async () => {
    const lokalizacja = (await zdobądźLokalizacjęUżytkownika()).coords;
    console.log('dokładność:', lokalizacja.accuracy, 'm');
    console.log('szerokość:', lokalizacja.latitude);
    console.log('długość:', lokalizacja.longitude);
    const dataZajściaSłońca = await zdobądźDatęZmierzchuCywilnego(lokalizacja.latitude, lokalizacja.longitude);
    ustawGodzinęWHtmlu(dataZajściaSłońca);
}

głównaFunkcja().then(() => {}).catch(bł => console.error(bł));

/** **** *** */