<script setup lang="ts">
	import { ref, reactive, computed, watch } from 'vue'
	import UserListHeader from './Header.vue'
	import UserListRow from './Row.vue'
	import UserListFilter from './Filter.vue'
	import DialogAddNewUser from './Dialog/AddNewUser.vue'
	import DialogEditUser from './Dialog/EditUser.vue'
	import Button from '@/components/Button.vue'
	import Pagination from '@/components/Pagination.vue'
	import type { UserFormated, UserUpdatePayload, UserPayload } from '@/types/User'
	import { useUserListStore } from '@/stores/userList'

	const userListStore = useUserListStore()

	const formatedUserList = computed(() => {
		return userListStore.list.map((user) => ({
			...user,
			fullName: `${user.firstName} ${user.lastName}`,
			searchStr: `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase(),
		}))
	})

	// filter
	const searchQuery = ref('')
	const nameQuery = ref<string[]>([])
	const emailQuery = ref<string[]>([])
	const dateQuery = reactive<[string, string]>(['', ''])

	const filteredUserList = computed(() => {
		const search = searchQuery.value.trim().toLowerCase()
		const hasNameQuery = nameQuery.value.length > 0
		const hasEmailQuery = emailQuery.value.length > 0
		const hasDateStart = dateQuery[0].length > 0
		const hasDateEnd = dateQuery[1].length > 0

		return formatedUserList.value.filter((user) => {
			const matchesSearch = !search || user.searchStr.includes(search)
			const matchesName = !hasNameQuery || nameQuery.value.includes(user.fullName)
			const matchesEmail = !hasEmailQuery || emailQuery.value.includes(user.email)
			const matchesDateStart = !hasDateStart || new Date(dateQuery[0]).getTime() <= user.lastVisitedAt
			const matchesDateEnd = !hasDateEnd || new Date(dateQuery[1]).getTime() >= user.lastVisitedAt

			return matchesSearch && matchesName && matchesEmail && matchesDateStart && matchesDateEnd
		})
	})

	watch([searchQuery, nameQuery, emailQuery], () => {
		currentPage.value = 1
	})

	// sort
	type SortKey = keyof UserFormated

	const sortKey = ref<SortKey | null>(null)
	const sortOrder = ref<'asc' | 'desc'>('asc')

	const sortedUserList = computed(() => {
		const list = [...filteredUserList.value]

		if (!sortKey.value) return list

		return list.sort((a: UserFormated, b: UserFormated) => {
			let valA = a[sortKey.value!]
			let valB = b[sortKey.value!]

			if (typeof valA === 'string') {
				valA = valA.toLowerCase()
			}
			if (typeof valB === 'string') {
				valB = valB.toLowerCase()
			}

			if (valA < valB) {
				return sortOrder.value === 'asc' ? -1 : 1
			}
			if (valA > valB) {
				return sortOrder.value === 'asc' ? 1 : -1
			}

			return 0
		})
	})

	// pagination
	const ITEMS_PER_PAGE = 10
	const currentPage = ref<number>(1)

	const paginatedUserList = computed(() => {
		const start = (currentPage.value - 1) * ITEMS_PER_PAGE
		const end = start + ITEMS_PER_PAGE

		return sortedUserList.value.slice(start, end)
	})

	const totalPages = computed(() => Math.ceil(filteredUserList.value.length / ITEMS_PER_PAGE))

	// verification
	const verificationUserCreditals = (userPayload: UserPayload) => {
		if (!userPayload.firstName) {
			alert('First name is empty')
			return
		}

		if (!userPayload.lastName) {
			alert('Last name is empty')
			return
		}

		if (!userPayload.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
			alert('Email incorrect')
			return
		}
	}

	// dialog new user
	const visibleDialogNewUser = ref<Boolean>(false)
	const creditalsNewUser = reactive<UserPayload>({
		firstName: '',
		lastName: '',
		email: '',
	})

	const addNewUser = () => {
		const firstName = creditalsNewUser.firstName.trim()
		const lastName = creditalsNewUser.lastName.trim()

		verificationUserCreditals({
			firstName,
			lastName,
			email: creditalsNewUser.email,
		})

		userListStore.addUser({
			firstName: lastName,
			lastName: lastName,
			email: creditalsNewUser.email,
		})

		visibleDialogNewUser.value = false

		creditalsNewUser.firstName = ''
		creditalsNewUser.lastName = ''
		creditalsNewUser.email = ''
	}

	// dialog edit user
	const visibleDialogEditUser = ref(false)
	const creditalsEditUser = reactive<UserUpdatePayload>({
		id: -1,
		firstName: '',
		lastName: '',
		email: '',
	})

	const openDialogEditUser = (userPayload: UserUpdatePayload) => {
		Object.assign(creditalsEditUser, userPayload)

		visibleDialogEditUser.value = true
	}

	const editUser = () => {
		const firstName = creditalsEditUser.firstName.trim()
		const lastName = creditalsEditUser.lastName.trim()

		verificationUserCreditals({
			firstName,
			lastName,
			email: creditalsEditUser.email,
		})

		userListStore.editUser(creditalsEditUser)

		visibleDialogEditUser.value = false
	}
</script>

<template>
	<div class="user-list">
		<div class="user-list__header">
			<Button @click="visibleDialogNewUser = true">add new user</Button>
		</div>

		<div class="user-list__main">
			<UserListFilter
				:formated-user-list
				v-model:search-query="searchQuery"
				v-model:name-query="nameQuery"
				v-model:email-query="emailQuery"
				v-model:date="dateQuery" />

			<div class="user-list__content">
				<table
					class="user-list__table"
					cellspacing="0">
					<tbody>
						<UserListHeader
							:title-list="userListStore.titleList"
							v-model:sort-key="sortKey"
							v-model:sort-order="sortOrder" />

						<UserListRow
							v-for="user in paginatedUserList"
							:key="user.id"
							v-bind="user"
							@edit="
								openDialogEditUser({
									id: user.id,
									firstName: user.firstName,
									lastName: user.lastName,
									email: user.email,
								})
							"
							@remove="userListStore.removeUser" />

						<tr v-if="paginatedUserList.length === 0">
							<td colspan="100%">
								<div class="user-list__empty">Nothing was found for your query</div>
							</td>
						</tr>
					</tbody>
				</table>

				<Pagination
					v-model="currentPage"
					:total-pages />
			</div>
		</div>

		<DialogAddNewUser
			v-model:visible="visibleDialogNewUser"
			v-model:creditals="creditalsNewUser"
			@add-new-user="addNewUser" />

		<DialogEditUser
			v-model:visible="visibleDialogEditUser"
			v-model:creditals="creditalsEditUser"
			@edit-user="editUser" />
	</div>
</template>

<style scoped>
	.user-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.user-list__header {
		display: flex;
		justify-content: flex-end;
		padding: 12px 16px;
		background-color: var(--color-background-mute);
		border-radius: var(--brs-default);
	}

	.user-list__main {
		display: flex;
		gap: 24px;
	}

	.user-list__content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.user-list__table {
		min-width: 700px;
	}

	.user-list__empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}
</style>
