<script lang="ts">
    import { enhance } from "$app/forms";


	let display: string = 'none';
	export let data: any;

	function toggleDisplay(): void {
		display = (display === 'none') ? 'block' : 'none';
	}
</script>
<div class="box" id="locChange" style="display: {display};">
	<form action="?/changeLoc" method="post" use:enhance>
		<p>Change location</p>
		<div class="schBox"><input type="text" placeholder="Change location" name='newloc'></div>
		<button type="button">Change location</button>
	</form>
</div>
<p>Weather in {data.location}:</p>
<button type="button" on:click={toggleDisplay}>Change location</button>
<br>
<pre>{ JSON.stringify(data.weatherData) }</pre>
