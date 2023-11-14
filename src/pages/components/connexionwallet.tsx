import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: {
      request<T>(args: T): Promise<any>;
    };
  }
}

interface ConnectWalletProps {
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | null>>;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setWeb3, setAccount }) => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          if (window.ethereum.request) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const connectedAccount = accounts[0];
            setAccount(connectedAccount);
            setConnectedAddress(connectedAccount); // pour stocker l'addresse de sender 
          } else {
            console.error('La méthode "request" n\'est pas disponible sur l\'objet ethereum.');
          }
        } else {
          console.error('MetaMask non détecté. Veuillez installer MetaMask pour utiliser cette application.');
        }
      } catch (error) {
        console.error('Erreur de connexion au portefeuille :', error);
      }
    };

    connectWallet();
  }, [setWeb3, setAccount]);

  return (
    <div>
      {connectedAddress ? (
        <p>Connecté avec l'adresse {connectedAddress}</p>
      ) : (
        <p>Connectez-vous à MetaMask pour utiliser cette application.</p>
      )}
    </div>
  );
};

export default ConnectWallet;
