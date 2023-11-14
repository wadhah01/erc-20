// components/TokenInfo.tsx
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
interface TokenInfoProps {
  web3: Web3 | null;
  account: string | null;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ web3, account }) => {
  const [tokenContractAddress, setTokenContractAddress] = useState('');
  const [tokenName, setTokenName] = useState<string | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);

  const handleTokenContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenContractAddress(event.target.value);
  };

  const fetchTokenInfo = async () => {
    try {
      if (web3 && account && tokenContractAddress) {
        // Example: Replace these with your actual ABI and contract address
        const tokenABI: any[] = [] as any[]; // Replace with your actual ABI
        const contract = new web3.eth.Contract(tokenABI, tokenContractAddress);
        
        // Fetch token info
        const name: string = await contract.methods.name().call();
        const symbol: string = await contract.methods.symbol().call();
        
        // Assume balanceOf takes no arguments; adjust if needed
        const balance: number = await contract.methods.balanceOf().call({ from: account });

        // Update state with the fetched information
        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenBalance(balance);
      }
    } catch (error) {
      console.error('Error fetching token info:', error);
    }
  };

  useEffect(() => {
    // Fetch token info when the tokenContractAddress changes
    fetchTokenInfo();
  }, [tokenContractAddress, account]); // Include account in the dependency array

  return (
    <div>
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenContractAddress}
        onChange={handleTokenContractChange}
      />
      <p>Name: {tokenName}</p>
      <p>Symbol: {tokenSymbol}</p>
      <p>Balance: {tokenBalance}</p>
    </div>
  );
};

export default TokenInfo;
