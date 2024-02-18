<script lang="ts">
  let responseMessage: string;

  async function submit(e: SubmitEvent) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData
    })
    const data = await response.json()
    responseMessage = data.message
  }
</script>
<form id="form" on:submit={submit}>
  <div class="form-control">
    <label for="name">
      Name
    </label>
    <input type="text" id="name" name="name" required />
  </div>
  <div class="form-control">
    <label for="email">
      Email
    </label>
    <input type="email" id="email" name="email" required />
  </div>
  <div class="form-control">
    <label for="message">
      Message
    </label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
  </div>
  <button aria-label="submit button" type="submit">Send</button>
  {#if responseMessage}
    <p>{responseMessage}</p>
  {/if}
</form>

<style>
  #form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: calc(100% - 32px);
    max-width: 600px;
    margin: 0 auto;
  }
  .form-control {
    display: flex;
    column-gap: 4px;
    align-items: flex-start;
    flex-direction: column;
  }
  .form-control > * {
    width: 100%;
  }
</style>