export interface User {
	id: number
	firstName: string
	lastName: string
	email: string
	lastVisitedAt: number
}

export interface UserFormated extends User {
	fullName: string
	searchStr: string
}

export type UserUpdatePayload = Omit<User, 'lastVisitedAt'>
export type UserPayload = Omit<UserUpdatePayload, 'id'>
