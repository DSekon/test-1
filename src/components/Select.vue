<script setup lang="ts">
	interface Props {
		optionList: string[]
	}

	defineProps<Props>()

	const model = defineModel<string[]>({ default: [] })
</script>

<template>
	<select
		v-model="model"
		class="select">
		<option
			v-for="option in optionList"
			:value="option">
			{{ option }}
		</option>
	</select>
</template>

<style scoped>
	.select {
		padding: 6px 16px;
		min-height: 160px;
		font-size: var(--fz-default);
		line-height: 30px;
		text-overflow: ellipsis;
		color: var(--color-text);
		background-color: var(--color-background-soft);
		border-width: 0;
		border-radius: var(--brs-default);
	}

	.select option {
		padding-top: 6px;
		padding-bottom: 6px;
	}
</style>
