import { onMount } from 'svelte'
import { writable } from 'svelte/store'
import { fetchAddress, sdk } from './utils'

const address = writable(null)

export function useAddress() {
  onMount(async () => {
    address.set(await fetchAddress())
  })
  return address
}

export async function useMetaMask() {
  const payload = await sdk.auth.login(window.location.host)
  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ payload })
  })
  return address.set(await fetchAddress())
}

export async function useDisconnect() {
  await fetch('/api/logout')
  address.set(null)
}

export function useCollection() {
  return sdk.getNFTCollection(import.meta.env.VITE_COLLECTION_ADDRESS)
}
