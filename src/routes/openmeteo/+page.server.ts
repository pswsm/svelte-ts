const geocodingApiBase: string = "https://geocoding-api.open-meteo.com/v1/search";
const openMeteoApiBase: string = "https://api.open-meteo.com/v1/forecast";
let location: string = "L'Hospitalet de Llobregat";
let previousLocation: string = '';

export function load(): object {
	let ubicacio: Promise<string> = getFromOpenMeteo(location).then( (res) => res.results[0].name );
	let temps: Promise<any> = getFromOpenMeteo(location)
	.then( (res) => {
		return { latitude: res.results[0].latitude, longitude: res.results[0].longitude };
	})
	.then( (latlon) => {
		return getWeatherFromOpenMeteo(latlon.latitude, latlon.longitude);
		// return [ latlon.longitude, latlon.latitude ];
	})
	.then( (res) => {
		let forecastData: object = res.hourly;
		let fmtForecastData: { title: string, data: [Date, number] | [] } = { title: 'Temps', data: [] };
		let regex: RegExp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
		forecastData.time.forEach( (elem, idx) => { 
			fmtForecastData.data.push([Date.parse(elem), forecastData.temperature_2m[idx]])
		});
		return fmtForecastData;
	} )

	return { ubicacio, temps }
	/**
	let openMeteoData = getFromOpenMeteo(location);
	let latitude: Promise<number> = openMeteoData.then((data) => data.results[0].latitude).catch((_e) => 41.35967);
	let longitude: Promise<number> = openMeteoData.then((data) => data.results[0].longitude).catch((_e) => 2.10028 );
	let openMeteoWeather = getWeatherFromOpenMeteo(latitude, longitude);
	let openMeteoFetchUrl: string = openMeteoApiBase + '?latitude=' + latitude + '&logitude=' + longitude;
	return { location: openMeteoData.then( (data) => data.results[0].name ).catch( (_e) => previousLocation ), weatherData: openMeteoWeather, latitude, longitude, openMeteoFetchUrl }
	*/
};

function changeLocation(newLoc: string): void {
	previousLocation = location;
	location = newLoc;
}

function apiUrlBuilder(apiBaseUrl: string, vars: Array<[string, string | number]>): string {
	let jointVars: string[] = [];
	vars.forEach( (val) => jointVars.push(`${val[0]}=${val[1]}`) );
	let jointParams: string = jointVars.join('&');
	return `${apiBaseUrl}?${jointParams}`;
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
	// let openMeteoResponse: Response = await fetch(openMeteoApiBase + '?latitude=' + latitude + '&longitude=' + longitude);
	let openMeteoResponse: Response = await fetch(apiUrlBuilder(openMeteoApiBase, [['latitude', latitude], ['longitude', longitude], ['hourly', 'temperature_2m,rain,showers,snowfall']]));
	return openMeteoResponse.json()
}
