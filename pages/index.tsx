import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { PostCard,  PostWidget, Categories} from '../components'

import { TPost } from '../types'

const posts: TPost[] = [
  { title: 'React Testing', excerpt: 'Learn React testing'},
  { title: 'React with tailwind', excerpt: 'Learn React with tailwind'},
]

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map ((post, index) => (
            <PostCard key={post.title} post={post} />
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
