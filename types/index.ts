
export type TCategory = {
	name: string,
	slug: string
}

export type TAuthor = {
	id: string,
	name: string,
	bio?: string,
	photo?: {
		url: string
	}
}

export type TPostFeatured = {
	author: TAuthor,
	createdAt: string,
	slug: string,
	title: string,
	featuredImage: {
		url: string
	},
}

export type TPostSummary = {
	node: {
		author: TAuthor,
		createdAt: string,
		slug: string,
		title: string,
		excerpt: string,
		featuredImage: {
			url: string
		},
		categories: TCategory[],
	}
}


export type TContent = {
	raw: {
		children: {
			type: string,
			children: any[]
		}[]
	}
}

export type TPostDetail = {
	author: TAuthor,
	createdAt: string,
	slug: string,
	title: string,
	excerpt: string,
	featuredImage: {
		url: string
	},
	categories: TCategory[],
	content: TContent
}

export type TCommentSubmission = {
	name: string,
	email: string,
	comment: string,
	slug: string
}

export type TPostOnWidget = {
	title: string,
	featuredImage: { url: string },
	createdAt: string,
	slug: string
}

export type TComment = {
	name: string,
	createdAt: string,
	comment: string
}

export type TImageUpload = {
	image: FileList
}
