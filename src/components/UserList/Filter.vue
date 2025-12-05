<script setup lang="ts">
	import { computed } from 'vue'
	import Select from '@/components/Select.vue'
	import Input from '@/components/Input.vue'
	import type { UserFormated } from '@/types/User'

	interface Props {
		formatedUserList: UserFormated[]
	}

	const props = defineProps<Props>()

	const searchQuery = defineModel<string>('searchQuery', { default: '' })
	const nameQueryList = defineModel<string[]>('nameQuery', { default: [] })
	const emailQueryList = defineModel<string[]>('emailQuery', { default: [] })
	const periodQuery = defineModel<[string, string]>('date', { default: [] })

	const nameList = computed(() => {
		const list =
			emailQueryList.value.length === 0
				? props.formatedUserList
				: props.formatedUserList.filter(
						(user) => emailQueryList.value.includes(user.email) || nameQueryList.value.includes(user.fullName),
					)

		return [...new Set(list.map((user) => `${user.firstName} ${user.lastName}`))]
	})

	const emailList = computed(() => {
		const list =
			nameQueryList.value.length === 0
				? props.formatedUserList
				: props.formatedUserList.filter(
						(user) => nameQueryList.value.includes(user.fullName) || emailQueryList.value.includes(user.email),
					)

		return [...new Set(list.map((user) => user.email))]
	})
</script>

<template>
	<div class="filter">
		<div class="filter__item">
			<Input
				v-model="searchQuery"
				type="text"
				name="search"
				placeholder="Search" />
		</div>
		<div class="filter__item">
			<div class="filter__item-title">Name</div>
			<Select
				:option-list="nameList"
				v-model="nameQueryList"
				name="full_name"
				multiple />
		</div>
		<div class="filter__item">
			<div class="filter__item-title">Email</div>
			<Select
				:option-list="emailList"
				v-model="emailQueryList"
				name="email"
				multiple />
		</div>
		<div class="filter__item">
			<div class="filter__item-title">Date start</div>
			<Input
				type="date"
				name="date_start"
				v-model="periodQuery[0]" />
			<div
				v-if="periodQuery[0]"
				class="filter__item-clear"
				@click="periodQuery[0] = ''">
				Clear
			</div>
		</div>
		<div class="filter__item">
			<div class="filter__item-title">Date end</div>
			<Input
				type="date"
				name="date_end"
				v-model="periodQuery[1]" />
			<div
				v-if="periodQuery[1]"
				class="filter__item-clear"
				@click="periodQuery[1] = ''">
				Clear
			</div>
		</div>
	</div>
</template>

<style scoped>
	.filter {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px 16px;
		width: 240px;
		background-color: var(--color-background-mute);
		border-radius: var(--brs-default);
	}

	.filter > * {
		width: 100%;
	}

	.filter__item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.filter__item > * {
		width: 100%;
	}

	.filter__item-title {
		font-size: 13px;
	}

	.filter__item-clear {
		cursor: pointer;
		display: flex;
		justify-content: flex-end;
		font-size: 12px;
	}
</style>
