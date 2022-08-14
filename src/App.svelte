<script>
  import MetaMaskIcon from './MetaMaskIcon.svelte'
  import {
    useCollection,
    useDisconnect,
    useMetaMask,
    useAddress
  } from './hooks'

  const address = useAddress()
  const collection = useCollection()
</script>

<main>
  {#if $address}
    <div class="user">
      <span>{$address}</span>
      <button on:click={useDisconnect} type="button" class="btn">Log Out</button
      >
    </div>
  {:else}
    <button on:click={useMetaMask} type="button" class="btn">
      <MetaMaskIcon />
      Connect with MetaMask
    </button>
  {/if}
  {#await collection.getAll() then tokens}
    <div class="tokens">
      {#each tokens as token}
        <div class="token">
          <img src={token.metadata.image} alt={token.metadata.name} />
          <span>{token.metadata.name}</span>
        </div>
      {/each}
    </div>
  {/await}
</main>

<style>
  .tokens {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  .token {
    width: 100%;
  }

  .token img {
    width: 100%;
  }

  main {
    margin: 0 auto;
    padding: 2rem;
    max-width: 30rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition-duration: 200ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    cursor: pointer;
    border: 1px solid #cfd8dc;
    border-radius: 0.5rem;
    background-color: #fafafa;
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 1rem;
  }

  .btn:hover {
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.1);
    border-color: #b0bec5;
    background-color: #eceff1;
  }
</style>
