<script setup lang="ts">
	const model = defineModel<string>({ default: '' })
</script>

<template>
	<input
		class="input"
		v-model="model" />
</template>

<style scoped>
	.input {
		padding-right: 16px;
		padding-left: 16px;
		height: 34px;
		font-size: var(--fz-default);
		text-overflow: ellipsis;
		color: var(--color-text);
		background-color: var(--color-background-soft);
		border-width: 0;
		border-radius: var(--brs-default);
	}
</style>
