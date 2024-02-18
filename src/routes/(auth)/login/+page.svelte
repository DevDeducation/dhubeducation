<script lang="ts">
	import { getRedirect, handleSignInWithEmailAndPassword, navigateToDestination, signInWithGoogle } from "$lib/firebase/client";
	import { enhance } from "$app/forms";
	import Google from "$lib/components/icons/Google.svelte";
	import { Alerts, Classes, type iEmailPassword } from "$lib";
	import { alertstore, utilsstore } from "$lib/stores/utilsstore";
	import { browser } from "$app/environment";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";

	let registerUrl = "/register"

	$: {
		if (browser && getRedirect()) {
			const { params } = $utilsstore.urlParams()
			registerUrl += params
		}
	}

	const handleSubmitLogin = async (evt: SubmitEvent) => {
		const form = evt.target as HTMLFormElement		
		const formData = new FormData(form)
		const records = Object.fromEntries(formData.entries())
		const emailPassword: iEmailPassword = {
			email: records.email as string,
			password: records.password as string
		}
		const button = evt.submitter as HTMLElement
		try {
			button.classList.add(Classes.LOADING)
			await handleSignInWithEmailAndPassword(emailPassword)
			navigateToDestination()
			const message = 'Successfully logged in'
			$utilsstore.setAlert(message, Alerts.SUCCESS, alertstore)
			button.classList.remove(Classes.LOADING)
		} catch (error: any) {
			button.classList.remove(Classes.LOADING)
			let str = $utilsstore.formatErrorMessage(error.message)
			const message = `${$utilsstore.sentenceCase(str.split("-").join(" "))} Register, Login with Google or use a registered account to continue`
			$utilsstore.setAlert(message, Alerts.ERROR, alertstore)
		}
	}

</script>


<div>
	<section class="py-4 acenter">
		<div class="mx-auto md:pb-4 md:max-w-md shadow-custom rounded-lg overflow-hidden flex flex-col p-4 gap-4 w-full text-center">

			<Button variant="outline" class="dark:border-muted flex items-center gap-2" on:click={signInWithGoogle}>
				<Google />
				Google
			</Button>
			<form
				id="login"
				action="?/login"
				class="flex flex-col gap-4"
				enctype="multipart/form-data"
				use:enhance
				on:submit|preventDefault={handleSubmitLogin}
				method="post">
				<div class="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p class="mx-4 mb-0 text-center font-semibold dark:text-white uppercase">
						Or
					</p>
				</div>
				<div class="grid grid-cols-1 gap-4">
					<Input
						type="text"
						name="email"
						class="!border !border-muted dark:bg-transparent"
						id="email"
						required
						placeholder="Email address"
					/>
					<Input
						type="password"
						name="password"
						class="!border !border-muted dark:bg-transparent"
						id="password"
						required
						placeholder="Password"
					/>
	
				</div>
				<Button type="submit" class="text-white">Submit</Button>
				<hr class="dark:opacity-30"/>
				<p class="font-semibold flex items-center justify-center gap-2">
					<span>Don't have an account?</span>
					<a
						href={registerUrl}
						class="text-red-500 dark:text-white transition duration-150 ease-in-out underline">Register</a>
				</p>
			</form>
		</div>
	</section>
</div>
