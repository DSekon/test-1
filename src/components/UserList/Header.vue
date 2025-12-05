<script setup lang="ts">
	import IconsSort from '@/components/icons/sort.vue'
	import IconsSortDown from '@/components/icons/sort-down.vue'
	import IconsSortUp from '@/components/icons/sort-up.vue'

	interface TitleItem {
		title: string
		sort?: Boolean
		sortKey?: string
	}

	interface Props {
		titleList: TitleItem[]
	}

	defineProps<Props>()

	const sortKey = defineModel<string | null>('sortKey')
	const sortOrder = defineModel<'asc' | 'desc'>('sortOrder')

	const onSort = (key: string | undefined, isSort: Boolean | undefined) => {
		if (isSort) {
			if (sortKey.value === key) {
				sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
			} else {
				sortKey.value = key
				sortOrder.value = 'asc'
			}
		}
	}
</script>

<template>
	<tr class="header-row">
		<td
			v-for="item in titleList"
			:key="item.title"
			class="header-row__col"
			:class="{
				'header-row__col--with_sort': item.sort,
			}"
			@click="onSort(item.sortKey, item.sort)">
			<div class="header-row__col-content">
				{{ item.title }}

				<template v-if="item.sort">
					<IconsSort v-show="item.sortKey !== sortKey" />
					<IconsSortDown v-show="item.sortKey === sortKey && sortOrder === 'asc'" />
					<IconsSortUp v-show="item.sortKey === sortKey && sortOrder === 'desc'" />
				</template>
			</div>
		</td>
	</tr>
</template>

<style scoped>
	.header-row {
		position: sticky;
		top: 0;
	}

	.header-row__col {
		padding: 6px 12px;
		background-color: var(--color-accent-dark);
	}

	.header-row__col:first-child {
		border-top-left-radius: var(--brs-default);
	}

	.header-row__col:last-child {
		border-top-right-radius: var(--brs-default);
	}

	.header-row__col-content {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.header-row__col--with_sort {
		cursor: pointer;
	}
</style>
