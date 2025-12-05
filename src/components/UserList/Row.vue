<script setup lang="ts">
	import { computed } from 'vue'
	import IconsPen from '@/components/icons/pen.vue'
	import IconsTrash from '@/components/icons/trash.vue'
	import Button from '@/components/Button.vue'
	import type { User } from '@/types/User'

	interface Emits {
		edit: [user: User]
		remove: [id: number]
	}

	const props = defineProps<User>()
	const emit = defineEmits<Emits>()

	const lastVisitedAtFormated = computed(() => new Date(props.lastVisitedAt * 1000).toLocaleString())
</script>

<template>
	<tr class="user-row">
		<td>{{ id }}</td>
		<td>{{ firstName }} {{ lastName }}</td>
		<td>{{ email }}</td>
		<td>{{ lastVisitedAtFormated }}</td>
		<td>
			<div class="user-row__actions">
				<Button
					variant="text"
					severity="warn"
					:is-icon="true"
					@click="
						$emit('edit', {
							...props,
						})
					">
					<IconsPen />
				</Button>
				<Button
					variant="text"
					severity="danger"
					:is-icon="true"
					@click="$emit('remove', id)">
					<IconsTrash />
				</Button>
			</div>
		</td>
	</tr>
</template>

<style scoped>
	.user-row > * {
		padding: 6px 12px;
	}

	.user-row:nth-child(odd) {
		background-color: var(--color-background-soft);
	}

	.user-row:nth-child(even) {
		background-color: var(--color-background-mute);
	}

	.user-row:hover {
		background-color: var(--color-background-indigo);
	}

	.user-row__actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.user-row:last-child > *:last-child {
		border-bottom-right-radius: var(--brs-default);
	}

	.user-row:last-child > *:first-child {
		border-bottom-left-radius: var(--brs-default);
	}
</style>
