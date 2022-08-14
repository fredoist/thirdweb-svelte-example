import { serialize } from 'cookie'

/** @type {import('@vercel/node').VercelApiHandler} */
export default async (req, res) => {
  res.setHeader(
    'Set-Cookie',
    serialize('access_token', 'none', {
      path: '/',
      expires: new Date(Date.now() + 5 * 1000)
    })
  )
  res.status(200).json({ message: 'Logged out' })
}
