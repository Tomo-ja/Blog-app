import React, { useContext } from 'react'
import Link from 'next/link'
import { TCategory } from '../types'

const categories: TCategory[] = [{ name: 'React', slug: 'react'}, { name: 'Web Development', slug: 'web-dev'}]

const Header = () => {
	return (
		<div className='container mx-auto px-10 mb-8'>
			<div className='border-b w-full inline-block border-blue-400 py-8'>
				<div className='md:float-left block'>
					<Link href='/' >
						<span className='cursor-pointer font-bold text-4xl'>
							My Blog
						</span>
					</Link>
				</div>
				<div className="hidden md:float-left md:contents">
					{categories.map((category) => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<span className='md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer'>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>

		</div>
	)
}

export default Header