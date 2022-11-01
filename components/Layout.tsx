import React, { Component, ReactNode} from 'react'
import { Header } from './'

class Layout extends Component {
	render(): ReactNode {
			const { children } = this.props as any
			return (
				<>
					<Header />
					{children}
				</>
			)
	}
}

export default Layout