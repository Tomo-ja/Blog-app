import React from 'react'
import { TAuthor } from '../types'

type Props = {
	author: TAuthor
}

const Author = ({ author }: Props) => {
	return (
		<div>Author</div>
	)
}

export default Author