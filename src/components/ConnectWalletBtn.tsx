import useWalletStore from '@/store/wallet';
export type WalletBtnProps = {
  btnClass: string;
  title?: string;
};
export function ConnectWalletBtn({ btnClass, title }: WalletBtnProps) {
  const { isConnected, connectWallet } = useWalletStore();
  if (isConnected) {
    return null;
  }
  return (
    <button className={`${btnClass}`} onClick={connectWallet}>
      {title || 'Connect Wallet'}
    </button>
  );
}
