<script lang="ts">
	export let copied: boolean = false;
</script>

{#if copied}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="w-6 h-6"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
	</svg>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		class="w-6 h-6"
		fill="currentColor"
		viewBox="0 0 24 24"
		><path
			d="M15.118 2c1.097 0 2.031.726 2.377 1.74H9.343c-1.499 0-2.042.16-2.59.464a3.11 3.11 0 00-1.27 1.315c-.293.566-.45 1.129-.45 2.68v9.305c-.978-.358-1.68-1.325-1.68-2.46V7.216C3.353 4.336 5.61 2 8.395 2h6.723zm3.361 3.478C19.871 5.478 21 6.646 21 8.087v11.304C21 20.832 19.871 22 18.48 22H9.234c-1.392 0-2.52-1.168-2.52-2.609V8.087c0-1.44 1.128-2.609 2.52-2.609h9.244zm0 1.74H9.235c-.464 0-.84.389-.84.869v11.304c0 .48.376.87.84.87h9.244c.464 0 .84-.39.84-.87V8.087c0-.48-.376-.87-.84-.87z"
		/></svg
	>
{/if}
