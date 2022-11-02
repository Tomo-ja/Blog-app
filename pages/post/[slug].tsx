import React from 'react'
import { GetServerSideProps } from 'next'

import { getPosts, getPostDetails } from '../../services'

import { Categories, PostWidget, PostDetail, Author, CommentsForm, Comments} from '../../components'
import { TPostDetail, TPostSummary } from '../../types'

type Props = {
	post: TPostDetail
}

const PostDetails = ({ post }: Props) => {
	return (
		<div className='container mx-auto px-10 mb-8'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				<div className='col-span-1 lg:col-span-8'>
					<PostDetail post={post}/>
					<Author author={post.author}/>
					<CommentsForm slug={post.slug}/>
					<Comments slug={post.slug}/>
				</div>
				<div className='col-span-1 lg:col-span-4'>
					<div className='relative lg:sticky top-8'>
						<PostWidget categories={post.categories.map(category => category.slug)} slug={post.slug}/>
						<Categories />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostDetails

type Prams = {
	params: {
		slug: string
	}
}

export const getStaticProps = async ({ params }: Prams) => {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data }
  }
}

export async function getStaticPaths () {
	const posts: TPostSummary[] = await getPosts()

	return {
		paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
		fallback: false
	}
}