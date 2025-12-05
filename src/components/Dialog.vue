<script setup lang="ts">
	import IconsXmark from '@/components/icons/xmark.vue'
	import Button from '@/components/Button.vue'

	interface Props {
		title: string
	}

	defineProps<Props>()

	const visible = defineModel<Boolean>('visible', { default: true })
</script>

<template>
	<Teleport to="body">
		<div
			v-if="visible"
			class="dialog">
			<div class="dialog__main">
				<div class="dialog__header">
					<div class="dialog__title">
						{{ title }}
					</div>

					<Button
						class="dialog__close"
						severity="secondary"
						:is-icon="true"
						@click="visible = false">
						<IconsXmark />
					</Button>
				</div>

				<div class="dialog__body">
					<slot />
				</div>

				<div class="dialog__footer">
					<slot name="footer" />
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
	.dialog {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}

	.dialog__main {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		width: 100%;
		max-width: 420px;
		background-color: var(--color-background-mute);
		border-radius: var(--brs-default);
	}

	.dialog__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.dialog__title {
		font-weight: 700;
	}

	.dialog__close {
		flex-shrink: 0;
	}

	.dialog__footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}
</style>
