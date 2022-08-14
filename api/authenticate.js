import { ThirdwebSDK } from '@thirdweb-dev/sdk'

/** @type {import('@vercel/node').VercelApiHandler} */
export default async (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    res.status(401).end(`Access token is not present in request`)
    return
  }
  try {
    /** @type {ThirdwebSDK} */
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, 'mumbai')
    const address = await sdk.auth.authenticate('localhost:3000', token)
    res.status(200).json({ address })
  } catch (e) {
    console.log(e)
    res.status(503).json({ error: e })
  }
}
