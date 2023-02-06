<script lang="ts">
    import { enhance } from "$app/forms";


	let display: string = 'none';
	export let data: any;

	function toggleDisplay(): void {
		display = (display === 'none') ? 'block' : 'none';
	}

	$: variables = data.weatherData.dies[0].variables;
</script>
<div class="box" id="locChange" style="display: {display};">
	<form action="?/changeLoc" method="post" use:enhance>
		<p>Change location</p>
		<div class="schBox"><input type="text" placeholder="Change location" name='newloc'></div>
		<button type="submit">Canviar</button>
	</form>
</div>
<button type="button" on:click={toggleDisplay}>Canviar ubicació</button>
<p>El temps a: {data.location}</p>
<!-- <pre>{ JSON.stringify(data.weatherData) }</pre> -->
<table>
	<thead>
		<tr>
			<th>Temperatura màxima</th>
			<th>Temperatura mínima</th>
			<th>Precipitació</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{ variables.tmax.valor }{ variables.tmax.unitat }</td>
			<td>{ variables.tmin.valor }{ variables.tmin.unitat }</td>
			<td>{ variables.precipitacio.valor }{ variables.precipitacio.unitat }</td>
		</tr>
	</tbody>
</table>
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
