<script lang="ts">
	import { NavbarObject } from "../classes/NavObject";

	export let navobjs = [new NavbarObject('/#', 'No nav elements provided')]
</script>
<nav>
{#each navobjs as navobj}
	<a href='{navobj.link}'><div class="nav-elem">{navobj.text}</div></a>
{/each}
</nav>
<style>
nav {
	background-color: red;
	width: 100%;
	box-sizing: border-box;
	color: white;
	display: flex;
	flex-direction: row;
}

.nav-elem {
	padding: 1.5rem;
}

.nav-elem:hover {
	background-color: darkred;
}

a {
	text-decoration: none;
	color: inherit;
}
</style>
