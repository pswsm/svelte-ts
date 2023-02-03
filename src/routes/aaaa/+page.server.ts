const headers = { 'X-API-KEY': '', 'Content-type': 'application/json' }
let location: string = "L'Hospitalet de Llobregat";
let municipis = await fetch('https://api.meteo.cat/referencia/v1/municipis', { method: 'GET', headers: new Headers(headers), credentials: 'include' }).then( (data) => data.json() );

export function load(): { location: string, weatherData: Promise<any> } {
	return { location: location, weatherData: getCityCode( location ) }
};

function changeLocation(newLoc: string) {
	location = newLoc;
}

export const actions = {
	changeLoc: async ({ request }) => {
		const data: FormData = await request.formData();
		changeLocation(data.get('newloc'));
	}
}

async function getWeather(): Promise<any> {
	let response = await fetch('https://api.meteo.cat/referencia/v1/municipis', { method: 'GET', headers: new Headers(headers), credentials: 'include' })
	return response.json();
}

function getCityCode(locName: string) {
	return municipis.filter( municipi => municipi["nom"].startsWith(location) )
}
