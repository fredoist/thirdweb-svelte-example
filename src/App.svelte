<script>
  import { ThirdwebSDK } from "@thirdweb-dev/sdk";
  import { ethers } from "ethers";
  import { writable } from "svelte/store";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const sdk = new ThirdwebSDK(provider.getSigner());
  const collection = sdk.getNFTCollection(
    "0x1bAac5559459F5cAdE587d894eE4D0b9E0c33574"
  );
  const account = writable(null);

  async function login() {
    const { payload, signature } = await sdk.auth.login("localhost:5173");
    console.log({ payload, signature });
    account.set(payload.address);
  }
</script>

{#if $account}
  <button on:click={() => account.set(null)}>
    Logout from {$account.slice(0, 16)}
  </button>
  <button
    on:click={async () => {
      await collection.mintTo($account, {
        name: "The first NFT",
        description: "This is the first NFT",
        image: "https://i.imgur.com/fFYlQXZ.jpeg",
      });
    }}
  >
    Mint
  </button>
{:else}
  <button on:click={login}>Log In</button>
{/if}
<hr />
{#await collection.getAll({ count: 3 })}
  <p>Loading NFTs</p>
{:then nfts}
  <ul>
    {#each nfts as nft}
      <li>
        <img width="150" height="150" src={nft.metadata.image} alt={nft.metadata.name}>
        <p>{nft.metadata.name}</p>
      </li>
    {/each}
  </ul>
{/await}
