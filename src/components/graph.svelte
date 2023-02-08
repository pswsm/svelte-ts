<script lang="ts">
	import { Line } from 'svelte-chartjs'
	import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	export let graphData: object = [];
</script>
<Line data={graphData} options={{ responsive: true }}></Line>
