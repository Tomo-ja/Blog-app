import React from 'react'
import { TPost } from '../types'

type Props = {
	post: TPost
}

const PostCard = ({ post }: Props) => {
	return (
		<div>
			{post.node.title}
			{post.node.excerpt}
		</div>
	)
}

export default PostCard