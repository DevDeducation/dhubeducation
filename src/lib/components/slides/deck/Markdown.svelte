<script lang="ts">
  export let name: string = "example.md"
  export let external: boolean = false
</script>

{#if external}
  <section data-markdown={name}></section>
{:else}
  <section data-markdown>
    <div data-template>
      <slot />
    </div>
  </section>
{/if}