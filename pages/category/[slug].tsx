import React from 'react'
import { useRouter } from 'next/router'

import { PostCard, Categories, Loader} from '../../components'
import { getCategories, getCategoryPost } from '../../services'
import { TCategory, TPostSummary } from '../../types'

type Props = {
	posts: TPostSummary[]
}

const CategoryPosts = ({posts}: Props) => {

	const router = useRouter()

	if (router.isFallback) {
		return <Loader />
	}


	return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
	)
}

export default CategoryPosts

type Prams = {
	params: {
		slug: string
	}
}

export async function getStaticProps({ params }: Prams) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  }
}

export async function getStaticPaths() {
  const categories: TCategory[] = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}