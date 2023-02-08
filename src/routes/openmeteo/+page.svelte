<script lang="ts">
    import { enhance } from "$app/forms";
    import Graph from "../../components/graph.svelte";

	let display: string = 'none';
	let loading: boolean = false;

	export let data: any;

	function toggleDisplay(): void {
		display = (display === 'none') ? 'block' : 'none';
	}
</script>
<div class="box" id="locChange" style="display: {display};">
	<form action="?/changeLoc" method="post" use:enhance={ () => { loading = true; return async ( { update } ) => { await update(); loading = false; } } }>
		<p>Change location</p>
		<div class="schBox"><input type="text" placeholder="Change location" name='newloc' disabled={ loading }></div>
		<button type="submit" disabled={loading}>Canviar</button>
	</form>
</div>
<h2>Ubicació actual: { data.ubicacio }</h2>
<button type="button" on:click={toggleDisplay}>Canviar ubicació</button>
<!-- <pre>{ JSON.stringify(data) }</pre> -->
<Graph graphData={data.temps} />
<footer>
<p>Dades provinents de:</p>
<ul>
	<li><a href='https://meteo.cat' target="_blank" rel="noreferrer">Servei Meteorologic de Catalunya</a></li>
	<li><a href='https://open-meteo.com' target="_blank" rel="noreferrer">Open-Meteo</a></li>
</ul>
</footer>
