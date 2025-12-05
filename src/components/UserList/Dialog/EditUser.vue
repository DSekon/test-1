<script setup lang="ts">
	import Button from '@/components/Button.vue'
	import Input from '@/components/Input.vue'
	import Dialog from '@/components/Dialog.vue'
	import type { UserUpdatePayload } from '@/types/User'

	interface Emits {
		(e: 'editUser'): void
	}

	defineEmits<Emits>()

	const visible = defineModel<Boolean>('visible')
	const creditals = defineModel<UserUpdatePayload>('creditals', {
		default: {
			id: -1,
			firstName: '',
			lastName: '',
			email: '',
		},
	})
</script>

<template>
	<Dialog
		title="Edit user"
		v-model:visible="visible">
		<template #default>
			<div
				class="modal__body"
				@keydown.enter="$emit('editUser')">
				<Input
					type="text"
					name="first_name"
					placeholder="Enter first name"
					required
					v-model="creditals.firstName" />
				<Input
					type="text"
					name="last_name"
					placeholder="Enter last name"
					required
					v-model="creditals.lastName" />
				<Input
					type="email"
					name="email"
					placeholder="Enter email"
					required
					v-model="creditals.email" />
			</div>
		</template>

		<template #footer>
			<Button
				severity="secondary"
				@click="visible = false">
				Cancel
			</Button>
			<Button @click="$emit('editUser')">Edit user</Button>
		</template>
	</Dialog>
</template>

<style scoped>
	.modal__body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
