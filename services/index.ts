import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							id
							name
							bio
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`

	const result = await request(graphqlAPI, query)
	
	return result.postsConnection.edges
}