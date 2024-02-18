<script lang="ts">
	export let id: string | null = null;
	export let animate: boolean = false;
	export let restart: boolean = false;
	export let background: string = '';
</script>

<section
	class="relative"
	data-background-video-loop
	data-background-video-muted
	data-background-image={background}
	data-background-size="cover"
	data-background-opacity={0.5}
	data-auto-animate-id={id}
	data-auto-animate={animate || null}
	data-auto-animate-restart={restart || null}>
	<slot />
</section>
