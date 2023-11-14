// pages/index.tsx
import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/connexionwallet';
import TokenInfo from './components/infotoken';
import TransferTokens from './components/transfer';
import Web3 from 'web3';
const Home: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  return (
    <div>
      <ConnectWallet setWeb3={setWeb3} setAccount={setAccount} />

      {account && (
        <div>
          <p>Connecté avec l'adresse {account}</p>

          {/* ici la display des info des tokens*/}
          <TokenInfo web3={web3} account={account} />

          {/* call for transfering token components */}
          <TransferTokens web3={web3} account={account} />
        </div>
      )}
    </div>
  );
};

export default Home;
