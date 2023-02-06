const headers = { 'X-API-KEY': '1FvqqqUpoeNgNpxZQxJX6FBDLbwKscx5hgXhZxUb', 'Content-type': 'application/json' }
const geocodingApiBase: string = "https://geocoding-api.open-meteo.com/v1/search";
const openMeteoApiBase: string = "https://api.open-meteo.com/v1/forecast";
let location: string = "L'Hospitalet de Llobregat";
let municipis = await fetch('https://api.meteo.cat/referencia/v1/municipis', { method: 'GET', headers: new Headers(headers), credentials: 'include' }).then( (data) => data.json() );

export function load(): object {
	let objMunicipi = getCityCode( location );
	if (objMunicipi === location) {
		return { location, weatherData: getWeather(location).then( (data) => data.message ), openMeteoData: getFromOpenMeteo(location) }
	}
	let codiMunicipi: string = objMunicipi.codi;
	let locFullName: string = objMunicipi.nom;
	return { location: locFullName, weatherData: getWeather(codiMunicipi), openMeteoData: getFromOpenMeteo(location), consums: checkConsum() }
};

function changeLocation(newLoc: string): void {
	location = newLoc;
}

async function fetchApi(url: string) {
	let response: Response = await fetch(url, { method: 'GET', headers: new Headers(headers), credentials: 'include' })
	return response;
}

export const actions = {
	changeLoc: async ({ request }) => {
		const data: FormData = await request.formData();
		changeLocation(data.get('newloc'));
	}
}

async function checkConsum(): Promise<any> {
	let response: Response = await fetchApi('https://api.meteo.cat/quotes/v1/consum-actual');
	return response.json();
}

async function getWeather(codiMunicipi: string): Promise<any> {
	if (codiMunicipi !== '') {
		let response = await fetchApi(`https://api.meteo.cat/pronostic/v1/municipal/${codiMunicipi}`)
		return response.json();
	}
	return '';
}

async function getFromOpenMeteo(ubicacio: string): Promise<any> {
	let geoCodeResponse: Response = await fetch(`${geocodingApiBase}?name=${ubicacio}&count=1`);
	// let coordinates: { latitude: Promise<number>, longitude: Promise<number> } = { latitude: geoCodeResponse.json().then( (data) => data[0].latitude ), longitude: geoCodeResponse.json().then( (data) => data[0].longitude )};
	// let weatherData: Response = await fetch(`${openMeteoApiBase}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_850hPa&models=best_match`);
	return geoCodeResponse.json();
}

function getCityCode(locName: string): object | string {
	let foundMunicipis: object[] = municipis.filter( municipi => municipi["nom"].toLowerCase().startsWith(locName.toLowerCase()) )
	if ( foundMunicipis.length > 0 ) {
		return foundMunicipis[0];
	}
	return locName;
}
