<script lang="ts">
    import { NavbarObject } from "../classes/NavObject";
    import Navbar from "../components/navbar.svelte";

	let navbarElemenets: NavbarObject[] = [new NavbarObject('/', 'Home'), new NavbarObject('/aaaa', 'aaaa'), new NavbarObject('/test1', 'test1')]
</script>
<Navbar navobjs={navbarElemenets} />
<slot />
