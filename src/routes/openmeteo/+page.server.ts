const geocodingApiBase: string = "https://geocoding-api.open-meteo.com/v1/search";
const openMeteoApiBase: string = "https://api.open-meteo.com/v1/forecast";
let location: string = "L'Hospitalet de Llobregat";
let previousLocation = '';

export function load(): object {
	let openMeteoData = getFromOpenMeteo(location);
	let latitude: number = openMeteoData.then((data) => data.results[0].latitude);
	let longitude: number = openMeteoData.then((data) => data.results[0].longitude);
	let openMeteoWeather = getWeatherFromOpenMeteo(latitude, longitude);
	return { location: openMeteoData.then( (data) => data.results[0].name ).catch( (_e) => previousLocation ), weatherData: openMeteoWeather, latitude, longitude }
};

function changeLocation(newLoc: string): void {
	previousLocation = location;
	location = newLoc;
}

export const actions = {
	changeLoc: async ({ request }) => {
		const data: FormData = await request.formData();
		changeLocation(data.get('newloc'));
	}
}

async function getFromOpenMeteo(ubicacio: string): Promise<any> {
	let geoCodeResponse: Response = await fetch(`${geocodingApiBase}?name=${ubicacio}&count=1`);
	return geoCodeResponse.json();
}

async function getWeatherFromOpenMeteo(latitude: any, longitude: any) {
	let openMeteoResponse: Response = await fetch(`${openMeteoApiBase}?latitude=12&longitude=12`);
	return openMeteoResponse.json()
}
