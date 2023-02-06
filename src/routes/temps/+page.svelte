<script lang="ts">
    import { enhance } from "$app/forms";

	let display: string = 'none';
	let loading: boolean = false;

	export let data: any;

	function toggleDisplay(): void {
		display = (display === 'none') ? 'block' : 'none';
	}

	// $: variables = data.weatherData.dies[0].variables;
</script>
<div class="box" id="locChange" style="display: {display};">
	<form action="?/changeLoc" method="post" use:enhance={ () => { loading = true; return async ( { update } ) => { await update(); loading = false; } } }>
		<p>Change location</p>
		<div class="schBox"><input type="text" placeholder="Change location" name='newloc' disabled={ loading }></div>
		<button type="submit" disabled={loading}>Canviar</button>
	</form>
</div>
<button type="button" on:click={toggleDisplay}>Canviar ubicació</button>
<p>El temps a: {data.location}</p>
<pre>{ JSON.stringify(data.weatherData) }</pre>
<table>
	<thead>
		<tr>
			<th>Temperatura màxima</th>
			<th>Temperatura mínima</th>
			<th>Precipitació</th>
		</tr>
	</thead>
	<tbody>
		<!-- <tr>
			<td>{ variables.tmax.valor }{ variables.tmax.unitat }</td>
			<td>{ variables.tmin.valor }{ variables.tmin.unitat }</td>
			<td>{ variables.precipitacio.valor }{ variables.precipitacio.unitat }</td>
		</tr> -->
	</tbody>
</table>
<pre>{ JSON.stringify(data.openMeteoData) }</pre>
<pre>{ JSON.stringify(data.consums) ?? 'No consum available' }</pre>
<footer>
<p>Dades provinents de:</p>
<ul>
	<li><a href='https://meteo.cat' target="_blank" rel="noreferrer">Servei Meteorologic de Catalunya</a></li>
	<li><a href='https://open-meteo.com' target="_blank" rel="noreferrer">Open-Meteo</a></li>
</ul>
</footer>
<style>
table {
	border-collapse: collapse;
	border: 1px solid black;
}

th, td {
	border-collapse: collapse;
	border: 1px solid black
}
</style>
