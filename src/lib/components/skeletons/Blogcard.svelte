<script lang="ts">
	import type { iBlog } from "$lib/interfaces";
	import Arrowlink from "../partials/Arrowlink.svelte";


  export let blog: iBlog
  export let small: boolean = false
  export let title: string = ''
  

  const cardTitle = blog.title.toLowerCase()

  const isSelected = cardTitle === title.toLowerCase()
</script>

{#if !small}
<a
  href={`/blog/${blog.slug}`}
  rel="prefetch"
  aria-label={blog.title}
  class="flex flex-col bg-white dark:bg-dark-800 rounded-lg overflow-hidden shadow-custom">
  <div class="grid grid-cols-1 gap-2">
    <img src={blog.banner} class="w-full object-cover" alt={blog.title} />
    <div class="p-4 flex flex-col items-center gap-2">
      <h2 class="one-line w-full sub-title">
        {blog.title}
      </h2>
      <p class="two-lines">{ blog.caption }</p>
      <div aria-label="details" class="flex flex-col gap-2">
        <hr class="dark:opacity-30" />
        <Arrowlink title="read post" />
      </div>
    </div>
  </div>
</a>
{:else}
<a
href={`/blog/${blog.slug}`}
rel="prefetch"
aria-label={blog.title}
class={"flex flex-col rounded-lg overflow-hidden shadow-custom bg-white dark:bg-dark-800 p-2 gap-2"}>
<div class="grid grid-cols-[1fr_2fr] gap-2">
  <img src={blog.thumbnail} class={"object-cover rounded-md"} alt={blog.title}>
  <div class="w-full h-full overflow-hidden text-ellipsis flex flex-col justify-between">
    <div class="flex flex-col justify-between h-full">
      <div>
        <h2 class="text-base font-semibold one-line w-full overflow-hidden text-ellipsis">
          {blog.title}
        </h2>
        <p class="two-lines dark:opacity-60 w-full text-xs">
          {blog.caption}
        </p>
      </div>
      {#if isSelected}
         <div class="rounded-[50px] py-1 px-2 w-fit uppercase bg-primary text-white dark:bg-white dark:text-primary live text-2xs font-semibold">viewing</div>
      {/if}
    </div>
  </div>
</div> 
<div aria-label="details" class="flex flex-col gap-2">
  <hr class="dark:opacity-30" />
  <Arrowlink title="read post" />
</div>
</a>
{/if}
