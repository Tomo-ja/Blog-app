import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { TCategory, TPostOnWidget } from '../types'
import { getRecentPosts, getSimilarPosts } from '../services'

type Props = {
	categories?: TCategory[],
	slug?: string
}


const PostWidget = ({ categories, slug }: Props) => {

	const [relatedPosts, setRelatedPosts] = useState<TPostOnWidget[]>([])

	useEffect(() => {
		if (slug) {
			// getSimilarPosts(categories, slug)
			// 	.then((result) => setRelatedPosts(result))
		} else {
			getRecentPosts()
				.then((result) => setRelatedPosts(result))
		}
	}, [slug])

	return (
		<div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedPosts.map(post => (
				<div key={post.title} className='flex items-center w-full mb-4'>
					<div className='w-16 flex-none'>
						<img
							alt={post.title}
							height='60px'
							width='60px'
							className='align-middle rounded-full'
							src={post.featuredImage.url}
						/>
					</div>
					<div className='flex-grow ml-4'>
						<p className='text-gray-500 text-xs'>
							{moment(post.createdAt).format('MMM DD, YYYY')}
						</p>
						<Link href={`/post/${post.slug}`} className='text-base'>
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default PostWidget