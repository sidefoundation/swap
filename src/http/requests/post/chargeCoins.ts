import axios from 'axios';

const chargeCoins = async (domain: string,denom:string, wallet:string) => {
  try {
    await axios.post(`http://${domain}:4500`, {
      address: wallet,
      coins: [`10000000000000${denom}`]
  }, {
    headers: {
        'Content-Type': 'application/json'
    }
  })
  } catch (error) {
    console.log("error", error)
  }
};

export default chargeCoins;
