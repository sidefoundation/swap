import { IAsset } from '@/shared/types/asset';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { Coin } from '@cosmjs/stargate';
import '../extensions/string';
import crypto from 'crypto';

export class MarketMaker {
  private pool: ILiquidityPool;
  private fee: number = 300;
  constructor(pool: ILiquidityPool, fee: number) {
    this.pool = pool;
    this.fee = fee;
  }

  findAssetByDenom(denom: string): IAsset {
    return this.pool?.assets?.find((item) => item.balance.denom === denom)!;
  }

  getRatio(denom1: string, denom2: string) {
    return (
      this.findAssetByDenom(denom1).balance.amount.parseToFloat() /
      this.findAssetByDenom(denom2).balance.amount.parseToFloat()
    );
  }

  singleDeposit(tokenIn: Coin): Coin {
    const asset = this.findAssetByDenom(tokenIn.denom);
    const weight = asset.weight / 100;
    const ratio =
      1 + parseFloat(tokenIn.amount) / parseFloat(asset.balance.amount);
    const factor: number = Math.pow(ratio, weight) - 1;
    const issueAmount = factor * this.pool.supply.amount.parseToFloat();
    return { denom: this.pool.poolId, amount: `${Math.floor(issueAmount)}` };
  }

  multiDeposit(tokenIns: Coin[]): Coin[] {
    const outTokens = tokenIns.map((token) => {
      const asset = this.findAssetByDenom(token.denom);
      const ratio =
        token.amount.parseToFloat() / asset.balance.amount.parseToFloat();
      const issueAmount = this.pool.supply.amount.parseToFloat() * ratio;
      const poolToken: Coin = {
        denom: this.pool.poolId,
        amount: `${Math.floor(issueAmount)}`,
      };
      return poolToken;
    });
    return outTokens;
  }

  singleWithdraw(denomOut: string, redeem: Coin): Coin | undefined {
    const asset = this.findAssetByDenom(denomOut);

    if (redeem.amount.parseToFloat() > this.pool.supply.amount.parseToFloat()) {
      console.log('bigger than supply');
      return;
    }

    if (redeem.denom != this.pool.supply.denom) {
      console.log('invalid denom pair');
      return;
    }

    const ratio =
      1 - redeem.amount.parseToFloat() / this.pool.supply.amount.parseToFloat();
    const exponent = 1 / asset.weight;
    const factor = 1 - Math.pow(ratio, exponent);
    const amountOut = asset.balance.amount.parseToFloat() * factor;
    return { denom: denomOut, amount: `${amountOut}` };
  }
  multiWithdraw(denomOut: string, redeem: Coin): Coin {
    const asset = this.findAssetByDenom(denomOut);
    const out =
      (asset.balance.amount.parseToFloat() * redeem.amount.parseToFloat()) /
      this.pool.supply.amount.parseToFloat();
    return { denom: denomOut, amount: `${out}` };
  }

  minusFees(amount: number): number {
    const feeRate = this.fee / 10000;
    const amountMinusFees = amount * (1 - feeRate);
    return amountMinusFees;
  }

  leftSwap(amountIn: Coin, denomOut: string): Coin {
    const assetIn = this.findAssetByDenom(amountIn.denom);
    const assetOut = this.findAssetByDenom(denomOut);

    const balanceOut = assetOut?.balance?.amount?.parseToFloat();
    const balanceIn = assetIn?.balance?.amount?.parseToFloat();
    const weightIn = assetIn?.weight / 100;
    const weightOut = assetOut?.weight / 100;
    const amount = this.minusFees(amountIn.amount.parseToFloat());

    // Ao = Bo * ((1 - Bi / (Bi + Ai)) ** Wi/Wo)
    const balanceInPlusAmount = balanceIn + amount;
    const ratio = balanceIn / balanceInPlusAmount;
    const oneMinusRatio = 1 - ratio;
    const power = weightIn / weightOut;

    const factor = Math.pow(oneMinusRatio, power);
    const amountOut = balanceOut * factor;
    const out: Coin = {
      denom: denomOut,
      amount: `${Math.floor(amountOut)}`,
    };
    return out;
  }

  // RightSwap implements InGivenOut
  // Input how many coins you want to buy, output an amount you need to pay
  // Ai = Bi * ((Bo/(Bo - Ao)) ** Wo/Wi -1)
  rightSwap(amountIn: Coin, amountOut: Coin): Coin | undefined {
    const assetIn = this.findAssetByDenom(amountIn.denom);
    const assetOut = this.findAssetByDenom(amountOut.denom);

    // Ai = Bi * ((Bo/(Bo - Ao)) ** Wo/Wi -1)
    const balanceIn = assetIn.balance.amount.parseToFloat();
    const weightIn = assetIn.weight / 100;
    const weightOut = assetOut.weight / 100;

    const numerator = assetOut.balance.amount.parseToFloat();
    const power = weightOut / weightIn;
    const denominator =
      assetOut.balance.amount.parseToFloat() - amountOut.amount.parseToFloat();
    const base = numerator / denominator;
    const factor = Math.pow(base, power);
    const amountRequired = balanceIn * factor;

    if (amountIn.amount.parseToFloat() < amountRequired) {
      console.log('right swap failed: insufficient amount');
      return;
    }
    return {
      amount: `${amountRequired}`,
      denom: amountIn.denom,
    };
  }
}

export function getPoolId(denoms: string[]): string {
  // Generate poolId
  denoms.sort();
  const poolIdHash = crypto.createHash('sha256');
  poolIdHash.update(denoms.join(''));
  const poolId = 'pool' + poolIdHash.digest('hex');
  return poolId;
}
