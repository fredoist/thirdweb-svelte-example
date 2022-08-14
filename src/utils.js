import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum, 80001)
export const sdk = new ThirdwebSDK(provider.getSigner())

export async function fetchAddress() {
  try {
    const { address } = await fetch('/api/authenticate').then(res => res.json())
    return address
  } catch (error) {
    return null
  }
}
