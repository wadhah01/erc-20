// components/TransferTokens.tsx
import React, { useState } from 'react';
import Web3 from 'web3';



interface TransferTokensProps {
  web3: Web3 | null;
  account: string | null;
}

const TransferTokens: React.FC<TransferTokensProps> = ({ web3, account }) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<string>(''); // To display transaction status

  const handleTransfer = async () => {
    try {
      if (web3 && account) {
        // Use web3 and the contract to transfer tokens to the specified address
        // Ensure you have an appropriate function for this, e.g., transferTokens(web3, account, toAddress, amount)
        
        // Example:
        // const transactionStatus = await transferTokens(web3, account, toAddress, amount);

        // Update transaction status
        setTransactionStatus(`Transaction successful! Hash: ${transactionStatus}`);
      }
    } catch (error: any) { // Specify the type of error
      console.error('Error transferring tokens:', error);
      setTransactionStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient's address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer tokens</button>
      {transactionStatus && <p>{transactionStatus}</p>}
    </div>
  );
};

export default TransferTokens;
