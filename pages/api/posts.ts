import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string

export const config = {
	api: {
			bodyParser: {
					sizeLimit: '4mb'
			}
	}
}

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
		mutation CreateAsset($image: ImageTransformationInput = {}) {
			createAsset {
				url(transformation: {image: $image})
				id
			}
		}
  `

  try{
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}