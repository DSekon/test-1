import type { User, UserUpdatePayload, UserPayload } from '@/types/User'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import userList from '@/assets/userList.json'

export const useUserListStore = defineStore('userList', () => {
	const list = ref<User[]>(userList || [])
	const titleList = [
		{
			title: 'id',
			sort: true,
			sortKey: 'id',
		},
		{
			title: 'name',
			sort: true,
			sortKey: 'fullName',
		},
		{
			title: 'email',
			sort: true,
			sortKey: 'email',
		},
		{
			title: 'last visited at',
			sort: true,
			sortKey: 'lastVisitedAt',
		},
		{
			title: 'actions',
		},
	]

	const addUser = (userPayload: UserPayload) => {
		const lastId = list.value.at(-1)?.id
		const newUserId = lastId ? lastId + 1 : 1

		list.value.push({
			id: newUserId,
			lastVisitedAt: new Date().getTime(),
			...userPayload,
		})
	}

	const editUser = (userPayload: UserUpdatePayload) => {
		if (list.value) {
			const idx = list.value.findIndex((item) => item.id === userPayload.id)

			if (list.value[idx]) {
				Object.assign(list.value[idx], userPayload)
			}
		}
	}

	const removeUser = (id: number) => {
		list.value = list.value.filter((item) => item.id !== id)
	}

	return {
		list,
		titleList,

		addUser,
		editUser,
		removeUser,
	}
})
