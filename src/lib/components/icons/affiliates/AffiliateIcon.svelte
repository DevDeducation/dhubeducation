<script lang="ts">
	import Employee from './Employee.svelte';
	import Customer from './Customer.svelte';
	import Influencer from './Influencer.svelte';
	import Teacher from './Teacher.svelte';
	import Vendor from './Vendor.svelte';
	import type { TAffiliate } from '$lib/interfaces';
	import { Affiliates } from '$lib/constants';

  export let classes: string;
  export let type: TAffiliate

  const component = (type: TAffiliate) => {
    switch (type) {
      case Affiliates.EMPLOYEE: return Employee
      case Affiliates.CUSTOMER: return Customer
      case Affiliates.INFLUENCER: return Influencer
      case Affiliates.TEACHER: return Teacher
      case Affiliates.VENDOR: return Vendor
    }
  }
</script>

<svelte:component this={component(type)} {...{ classes }}></svelte:component>
