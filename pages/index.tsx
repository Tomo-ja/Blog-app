import type { NextPage } from 'next'
import Head from 'next/head'

import { getPosts } from '../services'
import { PostCard,  PostWidget, Categories} from '../components'
import FeaturedPost from '../sections/FeaturedPosts'

import { TPostSummary } from '../types'

type Props = {
  posts: TPostSummary[]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPost />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map ((post, index) => (
            <PostCard key={post.node.title} post={post} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const posts = (await getPosts()) || []

  return {
    props: { posts }
  }
}
