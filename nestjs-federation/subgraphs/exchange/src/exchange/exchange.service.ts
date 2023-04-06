import { Injectable } from '@nestjs/common';
import {
  BalanceInfo,
  ExchangeRate,
  ExchangeRateType,
  ResponseStatus,
} from './exchange.model';

export function isValidExchangeRate(exchangeRate: number) {
  return exchangeRate > 0;
}

@Injectable()
export class ExchangeRateService {
  private _exchangeRatesToEth: Record<ExchangeRateType, number> = {
    [ExchangeRateType.USD]: 1,
    [ExchangeRateType.EUR]: 1,
  };

  public getExchangeRate(exchangeRateType: ExchangeRateType): ExchangeRate {
    return {
      exchangeRateType,
      exchangeRate: this._exchangeRatesToEth[exchangeRateType],
      responseStatus: ResponseStatus.SUCCESS,
    };
  }

  public setExchangeRate(
    exchangeRateType: ExchangeRateType,
    exchangeRate: number,
  ): ExchangeRate {
    const isValid = isValidExchangeRate(exchangeRate);
    if (isValid) this._exchangeRatesToEth[exchangeRateType] = exchangeRate;

    return {
      exchangeRateType,
      exchangeRate,
      responseStatus: isValid
        ? ResponseStatus.SUCCESS
        : ResponseStatus.INVALID_EXCHANGE_RATE,
    };
  }
}

@Injectable()
export class BalanceInfoService {
  async getBalanceInfo(
    walletAddress: string,
    exchangeRateType: ExchangeRateType,
    exchangeRate: number,
  ): Promise<BalanceInfo> {
    const initialResponse = {
      walletAddress,
      exchangeRateType,
      exchangeRate,
      balance: 0,
      responseStatus: ResponseStatus.SUCCESS,
    };

    if (!isValidExchangeRate(exchangeRate)) {
      return {
        ...initialResponse,
        responseStatus: ResponseStatus.INVALID_EXCHANGE_RATE,
      };
    }

    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${process.env.API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        ...initialResponse,
        responseStatus: ResponseStatus.FETCH_WALLET_BALANCE_FAIL,
      };
    }

    const etherBalance = (await response.json()).result;
    const balance: number = (etherBalance * Math.pow(10, -18)) / exchangeRate; // Etherscan endpoints return balance in wei

    return {
      ...initialResponse,
      balance,
      responseStatus: ResponseStatus.SUCCESS,
    };
  }
}
