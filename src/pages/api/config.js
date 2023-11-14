// pages/api/wagmi.js
import { WAGMI_CONFIG } from '../../wagmiConfig';
import wagmi from 'wagmi';

const { ethers } = wagmi(WAGMI_CONFIG);

export default async function handler(req, res) {
  
}
