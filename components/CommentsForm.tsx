import React, {useState, useEffect, useRef} from 'react'
import { submitComment } from '../services'
import { TCommentSubmission } from '../types'

type Props = {
	slug: string
}

const CommentsForm = ({ slug }: Props) => {
	const [error, setError] = useState(false)
	// const [localStorage, setLocalStorage] = useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const commentEl = useRef<HTMLTextAreaElement>(null)
	const nameEl = useRef<HTMLInputElement>(null)
	const emailEl = useRef<HTMLInputElement>(null)
	const storeDataEl = useRef<HTMLInputElement>(null)

	useEffect(() => {
		nameEl.current!.value = localStorage.getItem('name') || ''
		emailEl.current!.value = localStorage.getItem('email') || ''
	}, [])

	const handleCommentSubmission = () => {
		setError(false)

		if(!commentEl.current?.value || !nameEl.current?.value || !emailEl.current?.value) {
			setError(true)
			return
		}

		const commentObj: TCommentSubmission = {
			name: nameEl.current.value,
			email: emailEl.current.value,
			comment: commentEl.current.value,
			slug
		}

		if (storeDataEl.current?.checked) {
			localStorage.setItem('name', nameEl.current.value)
			localStorage.setItem('email', emailEl.current.value)
		} else {
			localStorage.removeItem('name')
			localStorage.removeItem('email')	
		}

		submitComment(commentObj)
			.then(res => {
				setShowSuccessMessage(true)
				setTimeout(() => {
					setShowSuccessMessage(false)
				}, 3000)
			})

	}

	return (
		<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea 
					ref={commentEl} 
					className='p-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Comment'
					name="comment"
				/>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
				<input 
					type="text" 
					ref={nameEl}
					className='py-2 px-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Name'
					name="name"
				/>
				<input 
					type="text" 
					ref={emailEl}
					className='py-2 px-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Email'
					name="email"
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<div className=''>
					<input 
						type="checkbox"
						ref={storeDataEl}
						id='storeData'
						name='storeData'
						value='true'
					/>
					<label 
						htmlFor="storeData"
						className='text-gray-500 cursor-pointer ml-2'
					>
						Save my e-mail and name for the next time I comment
					</label>
				</div>
			</div>
			{error && <p className=' text-xs text-red-500'>All fields are required.</p>}
			<div className='mt-8'>
				<button 
					type='button' 
					onClick={() => handleCommentSubmission()}
					className='duration-500 ease-linear hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
				>
					Post Comment
				</button>
				{showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
			</div>

		</div>
	)
}

export default CommentsForm