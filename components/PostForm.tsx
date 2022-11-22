import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from 'react-dropzone'
import { upLoadImage } from '../services'
import { TCommentSubmission } from '../types'

interface File extends Blob {
	preview: string
}

const PostForm = () => {
	const [files, setFiles] = useState<File[]>([])

	const onDrop = useCallback((acceptedFiles: Blob[]) => {
		setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )

		const form = new FormData();

    form.append("fileUpload", acceptedFiles[0]);

		upLoadImage(form)

  }, [setFiles])

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},[files]);

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{
				isDragActive ?
					<p>Drop the files here ...</p> :
					<p>Drag 'n' drop some files here, or click to select files</p>
			}
			{files[0] && 
				<img
				src={files[0].preview}
				style={{ width: "100px", height: "100px" }}
				alt=""
			/>}
		</div>
	)
}

export default PostForm