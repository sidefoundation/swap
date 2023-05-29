import axios from '../axios';
import toast from 'react-hot-toast';
const chargeCoins = async (
  domain: string,
  denom: string,
  wallet: string,
  amount: string
) => {
  const toastItem = toast.loading('Charging');
  try {
    await axios.post(
      '/api',
      {
        address: wallet,
        coins: [`${amount}${denom}`],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          apiurl: `http://${domain}:4500`,
        },
      }
    );
    toast.success('Charge Success', {
      id: toastItem,
    });
  } catch (error) {
    toast.error(error?.message, {
      id: toastItem,
    });
    console.log('error', error);
  }
};

export default chargeCoins;
