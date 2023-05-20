import { CoinInputProps } from "./CoinInput";

export function TokenInput({placeholder,coin, onChange}:CoinInputProps) {
  return (
    <div className="relative rounded-full shadow-sm md:mr-2">
      <input
        type="number"
        id="send-amount"
        className="w-full pr-24 font-mono text-lg text-center rounded-full input input-bordered focus:input-primary input-lg "
        placeholder={placeholder}
        step="5" 
        onChange={(event) => onChange(event.target.value)}
        value={coin.amount}
        min="0"
      />
      <span className="absolute top-0 bottom-0 right-0 px-4 py-5 text-sm rounded-r-full bg-secondary text-base-100">
        {coin.denom}
      </span>
    </div>
  );
}