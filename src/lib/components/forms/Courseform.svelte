<script lang="ts">
	import { enhance } from "$app/forms";
  import * as Form from "$lib/components/ui/form";
	import { Input } from "../ui/input";
	import Datepicker from "../widgets/Datepicker.svelte";
	import Selectlist from "../widgets/Selectlist.svelte";


  const genderlist = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ]
</script>

<div class="flex flex-col gap-4">
  <form action="" method="post" enctype="multipart/form-data" use:enhance>
    <fieldset>
      <legend>Personal Information</legend>
      <div class="flex flex-col gap-2">
        <Input name="fullname" placeholder="Full name" class="dark:bg-transparent !border !border-muted shadow-custom" />
        <!-- <Datepicker name="dateofbirth" /> -->
        <Input name="dateofbirth" type="date" placeholder="Date of birth" class="dark:bg-transparent !border !border-muted shadow-custom" />
        <Selectlist name="gender" classes="shadow-custom" list={ genderlist } />
      </div>
    </fieldset>
  </form>
  <div class="flex flex-col gap-2">
    <p>Please ensure all information provided is accurate and complete. Upon submission, our team will review your registration and contact you regarding the next steps.</p>
    <p>Thank you for choosing our Travel Agent Operations and Management Course. We look forward to welcoming you!</p>
  </div>
</div>