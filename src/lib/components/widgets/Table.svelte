<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import DataTable, { type Api } from 'datatables.net-dt';
	import 'datatables.net-responsive-dt';
	import type { iReferee } from '$lib/interfaces';
	import { utilsstore } from '$lib/stores/utilsstore';
	import { AttributeValues, Attributes, Classes } from '$lib/constants';
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();
	let table: Api<any>;

	export let referees: iReferee[] = [];

	$: referees = referees;
	$: console.log('referees length', referees.length);

	const handleDeleteEvent = (parent: HTMLElement) => {
		parent.classList.add(Classes.LOADING);
		const grandparent = parent.parentElement as HTMLElement;
		const encoded = grandparent.getAttribute(Attributes.DATAENCODED) as string;
		const email = $utilsstore.decodeString(encoded);
		dispatch(AttributeValues.DELETE, { email });
	};

	const handleClick = (evt: Event) => {
		const target = evt.target as HTMLElement;
		const name = target.getAttribute(Attributes.DATANAME);
		const parent = target.parentElement as HTMLElement;

		switch (name) {
			case AttributeValues.EDIT:
				return parent.classList.add(Classes.LOADING);
			case AttributeValues.DELETE:
				return handleDeleteEvent(parent);
		}
	};

	$: data = referees
		.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
		.map((referee, idx) => {
			referee.id = idx + 1;
			referee.actions = `
		<div class="flex justify-start items-center gap-2" data-encoded="${$utilsstore.encodeString(
			referee.email
		)}">
			<a href="/referral/edit/${$utilsstore.encodeString(
				referee.email
			)}" class="group flex justify-center items-center gap-1 bt bt-green fill-white text-white text-xs p-2 relative">
				<span class="clickable" data-name="edit"></span>
				<span class="spin-loader"></span>
				<svg fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4 group-[.-loading]:hidden"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
				<span class="md:hidden">Edit</span>	
			</a>
			<button type="submit" class="group flex justify-center items-center gap-1 bt bt-red fill-white text-white text-xs p-2 relative">
				<span class="clickable" data-name="delete"></span>
				<span class="spin-loader"></span>
				<input hidden name="email" value="${referee.email}" />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 group-[.-loading]:hidden">
					<path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
				</svg>
				<span class="md:hidden">Delete</span>	
			</button>
		</div>
		`;
			return referee;
		});

	$: (browser && data) && create()

	const destroy = () => table && table.destroy();
	const create = () => {
		destroy();
		table = new DataTable('#myDataTable', {
			data,
			columns: [
				{ data: 'id', title: 'ID' },
				{ data: 'name', title: 'Name' },
				{ data: 'phoneNumber', title: 'Phone' },
				{ data: 'countryName', title: 'Country' },
				{ data: 'countryOfInterest', title: 'Interest' },
				{ data: 'typeOfReferral', title: 'Type' },
				{ data: 'levelOfStudy', title: 'Level' },
				{ data: 'actions', title: 'Action' }
				// Add more columns as needed
			],
			searching: true, // Enable search filter
			ordering: true, // Enable column sorting
			paging: true, // Enable pagination
			lengthMenu: [5, 10, 25, 50, 100, 1000], // Entries per page options
			pageLength: 5, // Initial entries per page
			responsive: true
		});

		// Update status of displayed rows
		table.on('draw', function () {
			const pageInfo = table.page.info();
			const statusElement = document.querySelector('#status') as HTMLElement;
			if (statusElement) {
				statusElement.textContent = `Showing ${pageInfo.start + 1} to ${pageInfo.end} of ${
					pageInfo.recordsTotal
				} entries`;
			}
		});
	};
	onMount(create);

	onDestroy(destroy);
</script>

<div class="bg-white dark:bg-dark-800 p-4 rounded-lg overflow-hidden">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<table id="myDataTable" class="w-full text-center" on:click={handleClick}>
		<thead class="w-full">
			<tr class="w-full">
				<th>ID</th>
				<th>Name</th>
				<th>Phone Number</th>
				<th>Country</th>
				<th>Country of Interest</th>
				<th>Type of Referral</th>
				<th>Level of Study</th>
				<th>Actions</th>
				<!-- Add more columns as needed -->
			</tr>
		</thead>
		<tbody class="w-full">
			{#each data as item (item.id)}
				<tr class="w-full">
					<td>{item.id}</td>
					<td>{item.name}</td>
					<td>{item.phoneNumber}</td>
					<td>{item.countryName}</td>
					<td>{item.countryOfInterest}</td>
					<td>{item.typeOfReferral}</td>
					<td>{item.levelOfStudy}</td>
					<td on:click={handleClick} data-email={item.email}>{item.actions}</td>
					<!-- Add more cells as needed -->
				</tr>
			{/each}
		</tbody>
	</table>
</div>
