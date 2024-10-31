<script lang="ts">
  import RegistrationForm from "$lib/components/forms/RegistrationForm.svelte";
</script>


<!-- slides section -->
<section aria-label="intro" class="bg-body-darker dark:dark:bg-dark-900">
	<div class="acenter">
		<h2 class="text-xl font-semibold capitalize title text-center my-4">Sign up to apply</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="aspect-video rounded-lg" style={`background: url(https://www.dhubeducation.com/images/january-application.webp) no-repeat;background-size:cover;background-position:center`} />
 			<RegistrationForm />
		</div>
	</div>
</section>
