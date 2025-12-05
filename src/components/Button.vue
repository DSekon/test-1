<script setup lang="ts">
	import { computed } from 'vue'

	interface Props {
		variant?: 'text' | null
		severity?: 'secondary' | 'warn' | 'danger' | null
		isIcon?: Boolean
	}

	const props = defineProps<Props>()

	const classList = computed(() => [
		'btn',
		props.variant && `btn--variant_${props.variant}`,
		props.severity && `btn--severity_${props.severity}`,
		props.isIcon && 'btn--view_icon',
	])
</script>

<template>
	<button :class="classList">
		<slot name="icon" />
		<slot />
	</button>
</template>

<style scoped>
	.btn {
		--btn-color: var(--color-text-black);
		--btn-background: var(--color-accent);
		--btn-border: var(--color-accent);

		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 6px 16px;
		font-size: var(--fz-default);
		line-height: 20px;
		color: var(--btn-color);
		background-color: var(--btn-background);
		border: 1px solid var(--btn-border);
		border-radius: var(--brs-default);
	}

	.btn:hover {
		color: var(--color-text-black);
		background-color: var(--color-accent-lighter);
	}

	.btn:active {
		color: var(--color-text-black);
		background-color: var(--color-accent-darker);
	}

	.btn--view_icon {
		padding-right: 6px;
		padding-left: 6px;
		font-size: 20px;
	}

	.btn--variant_text {
		--btn-color: var(--color-accent);

		background-color: transparent;
		border-color: transparent;
	}

	.btn--severity_secondary {
		--btn-background: var(--color-gray);
		--btn-border: var(--color-gray);
	}

	.btn--severity_secondary:hover {
		background-color: var(--color-gray-lighter);
		border-color: var(--color-gray-lighter);
	}

	.btn--severity_secondary:active {
		background-color: var(--color-gray-darker);
		border-color: var(--color-gray-darker);
	}

	.btn--severity_danger {
		--btn-color: var(--color-red);
		--btn-background: var(--color-red);
		--btn-border: var(--color-red);
	}

	.btn--severity_danger:hover {
		background-color: var(--color-red-lighter);
		border-color: var(--color-red-lighter);
	}

	.btn--severity_danger:active {
		background-color: var(--color-red-darker);
		border-color: var(--color-red-darker);
	}

	.btn--severity_warn {
		--btn-color: var(--color-yellow);
		--btn-background: var(--color-yellow);
		--btn-border: var(--color-yellow);
	}

	.btn--severity_warn:hover {
		background-color: var(--color-yellow-lighter);
		border-color: var(--color-yellow-lighter);
	}

	.btn--severity_warn:active {
		background-color: var(--color-yellow-darker);
		border-color: var(--color-yellow-darker);
	}
</style>
