const headers = { 'X-API-KEY': '1FvqqqUpoeNgNpxZQxJX6FBDLbwKscx5hgXhZxUb', 'Content-type': 'application/json' }
let location: string = "L'Hospitalet de Llobregat";
let municipis = await fetch('https://api.meteo.cat/referencia/v1/municipis', { method: 'GET', headers: new Headers(headers), credentials: 'include' }).then( (data) => data.json() );

export function load(): { location: string, weatherData: Promise<any> } {
	let objMunicipi = getCityCode( location );
	if (objMunicipi === location) {
		return { location, weatherData: getWeather(location).then( (data) => data.message ) }
	}
	let codiMunicipi: string = objMunicipi.codi;
	let locFullName: string = objMunicipi.nom;
	return { location: locFullName, weatherData: getWeather(codiMunicipi) }
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

async function getWeather(codiMunicipi: string): Promise<any> {
	if (codiMunicipi !== '') {
		let response = await fetchApi(`https://api.meteo.cat/pronostic/v1/municipal/${codiMunicipi}`)
		return response.json();
	}
	return '';
}

function getCityCode(locName: string): object | string {
	let foundMunicipis: object[] = municipis.filter( municipi => municipi["nom"].toLowerCase().startsWith(locName.toLowerCase()) )
	if ( foundMunicipis.length > 0 ) {
		return foundMunicipis[0];
	}
	return locName;
}
