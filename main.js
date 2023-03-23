hiding = (element) => element.style.display = 'none';
showing = (element) => element.style.display = 'block';

const connect = document.getElementById("connect");
const connected = document.getElementById("connected");
const addr = document.getElementById("addr");


async function Connect() {
    if(window.confirm("Are you sure you want to connect your wallet to DocT")){
      let provider = window.ethereum;
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p) => {
          if (p.isMetaMask) {
            provider = p;
          }
        });
      }
        try {
            provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x3E5' }],
        });
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            location.reload();
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x3E5',
                            chainName: '5ireChain',
                            nativeCurrency: {
                                name: '5ire',
                                symbol: '5ire',
                                decimals: 18,
                            },
                            rpcUrls: ['https://rpc-testnet.5ire.network'],
                        },
                    ],
                });
            } catch (addError) {
                // handle "add" error
                console.log(addError);
                }
            }
        }
    }
}

let currentAccount = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
    console.error(err);
    hiding(connected);
  });
  
  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  ethereum.on('accountsChanged', handleAccountsChanged);
  
  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      window.alert('Please connect your 5ire Wallet.');
      hiding(connected);

    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      hiding(connect);
      addr.innerHTML = currentAccount;
    }
  }
  