
export type TCategory = {
	name: string,
	slug: string
}

export type TAuthor = {
	id: string,
	name: string,
	bio: string,
	photo: {
		url: string
	}
}

export type TPost = {
	node: {
		author: TAuthor,
		createdAt: string,
		slug: string,
		title: string,
		excerpt: string,
		featuredImage: {
			url: string
		},
		categories: TCategory[]
	}
}