<script lang="ts">
    import { NavbarObject } from "../classes/NavObject";
    import Navbar from "../components/navbar.svelte";
	import './styles.css';

	let navbarElemenets: NavbarObject[] = [new NavbarObject('/', 'Home'), new NavbarObject('/temps', 'Temps'), new NavbarObject('/xema', 'Estacions'), new NavbarObject('/openmeteo', 'Dades Open Meteo')]
</script>
<Navbar navobjs={navbarElemenets} />
<slot />
