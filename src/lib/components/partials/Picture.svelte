<script lang="ts">
  import type { ImgMeta } from "$lib";

	export let meta: ImgMeta[];
	// if there is only one, vite-imagetools won't wrap the object in an array
	if (!(meta instanceof Array)) meta = [meta];

	const sources = meta[0].sources;
	const fallback = meta[0].img;

	export let sizes = '100vw';
	export let alt = '';
	export let loading: 'lazy' | 'eager' | null | undefined = 'lazy';

	export let imageClass = '';
	export let pictureClass = '';
</script>

<picture class={pictureClass}>
  {#each Object.entries(sources) as [type, srcMeta]}
    <source
      type="image/{type}"
      { sizes }
      srcset={srcMeta}
    />
  {/each}
  <img src={fallback.src} { alt } { loading } class={imageClass} />
</picture>