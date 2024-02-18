<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { formSchema, type FormSchema } from "$lib";
  import type { SuperValidated } from 'sveltekit-superforms';

  export let form: SuperValidated<FormSchema>;
</script>

<div class="flex flex-col gap-4">
  <Form.Root schema={formSchema} {form} let:config>
    <Form.Field {config} name="username">
      <Form.Item>
        <Form.Label />
        <Form.Input />
        <Form.Description />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
  </Form.Root>
  <div class="flex flex-col gap-2">
    <p>Please ensure all information provided is accurate and complete. Upon submission, our team will review your registration and contact you regarding the next steps.</p>
    <p>Thank you for choosing our Travel Agent Operations and Management Course. We look forward to welcoming you!</p>
  </div>
</div>