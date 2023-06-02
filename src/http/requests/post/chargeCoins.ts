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
    const res = await axios.post(
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
    if (res.status === 200) {
      toast.success('Charge Success', {
        id: toastItem,
      });
    }
  } catch (error) {
    toast.dismiss(toastItem);
  }
};

export default chargeCoins;
