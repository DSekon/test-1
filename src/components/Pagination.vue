<script setup lang="ts">
	import Button from '@/components/Button.vue'

	interface Props {
		totalPages: number
	}

	defineProps<Props>()

	const currentPage = defineModel<number>({ default: 1 })

	const isActive = (page: number) => {
		return currentPage.value === page
	}

	const setPage = (page: number) => {
		currentPage.value = page
	}
</script>

<template>
	<div
		class="pagination"
		v-if="totalPages > 1">
		<Button
			v-for="i in totalPages"
			:key="i"
			severity="secondary"
			class="pagination__item"
			:class="{
				'pagination__item--state_active': isActive(i),
			}"
			@click="setPage(i)">
			{{ i }}
		</Button>
	</div>
</template>

<style scoped>
	.pagination {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.pagination__item {
		padding-right: 0;
		padding-left: 0;
		width: 34px;
	}

	.pagination__item--state_active {
		--btn-color: var(--color-text-black);
		--btn-background: var(--color-accent);
		--btn-border: var(--color-accent);

		pointer-events: none;
	}

	.pagination__item--state_active:hover {
		color: var(--btn-color);
		background-color: var(--btn-background);
		border-color: var(--btn-border);
	}
</style>
