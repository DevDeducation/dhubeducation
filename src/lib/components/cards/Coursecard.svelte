<script lang="ts">
	import type { iCourse } from '$lib/interfaces';
	import { imgparams } from '$lib/utils/index';
	import Arrowlink from '../partials/Arrowlink.svelte'; 

	export let course: iCourse;
</script>


<a
href={`/courses/${course.slug}`}
rel="prefetch"
aria-label={course.name}
class="flex flex-col bg-white dark:bg-dark-800 rounded-lg overflow-hidden shadow-custom">
<div class="grid grid-cols-1 gap-2">
	<img
		src={`${course.banner}${imgparams}`}
		class="w-full object-cover"
		alt={course.name}
	/>
	<div class="p-4 flex flex-col items-center gap-2">
		<h2 class="one-line w-full sub-title">
			{course.name}
		</h2>
		<p class="two-lines">{course.caption}</p>
		<div aria-label="details" class="flex flex-col gap-2">
			<hr class="dark:opacity-30" />
			<Arrowlink title="learn more" />
		</div>
	</div>
</div>
</a>