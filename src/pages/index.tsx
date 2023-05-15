import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from '@/components/WalletLoader'
import useWalletStore from '@/store/wallet'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const {loading, isConnected} = useWalletStore()
  const router = useRouter()
  useEffect(()=>{
    if(isConnected){
      router.push("/swap")
    }
  },[isConnected])
  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">
        Welcome to {process.env.NEXT_PUBLIC_CHAIN_NAME} !
      </h1>
      <div className="flex flex-wrap items-center justify-around max-w-4xl max-w-full mt-6 sm:w-full">
        <Link href="/swap" passHref>
          <p className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Send to wallet &rarr;</h3>
            <p className="mt-4 text-xl">
              Execute a transaction to send funds to a wallet address.
            </p>
          </p>
        </Link>
      </div>
    </WalletLoader>
  )
}

export default Home
