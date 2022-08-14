import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { serialize } from 'cookie'

/** @type {import('@vercel/node').VercelApiHandler} */
export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Methods', ['POST'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  const { payload } = req.body

  if (!payload) {
    console.log('No payload present')
    res.status(401).json({ message: 'Payload is required' })
  }

  try {
    /** @type {ThirdwebSDK} */
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, 'mumbai')

    const token = await sdk.auth.generateAuthToken('localhost:3000', payload)
    res.setHeader(
      'Set-Cookie',
      serialize('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
    )
    res.status(200).json({ message: 'Sucessfully logged in' })
  } catch (e) {
    console.log(e)
    res.status(503).json({ error: e })
  }
}
