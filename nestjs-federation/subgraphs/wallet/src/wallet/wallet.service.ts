import { Injectable } from '@nestjs/common';
import { ResponseStatus, WalletInfo } from './wallet.model';

@Injectable()
export class WalletService {
  private _secondsPerYear = 365.25 * 24 * 60 * 60; // Days * hours * minutes * seconds

  async getWalletInfo(walletAddress: string): Promise<WalletInfo> {
    const initialResponse = {
      walletAddress,
      isOld: false,
      lastTransactionTimestamp: 0,
      response: ResponseStatus.SUCCESS,
    };

    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !parseInt(data.status)) {
      return {
        ...initialResponse,
        responseStatus: ResponseStatus.FETCH_WALLET_TRANSACTION_HISTORY_FAIL,
      };
    }

    const lastTransactionTimestamp = parseInt(data.result[0].timeStamp);
    const isOld =
      Date.now() / 1000 - this._secondsPerYear > lastTransactionTimestamp;

    return {
      walletAddress,
      isOld,
      lastTransactionTimestamp,
      responseStatus: ResponseStatus.SUCCESS,
    };
  }
}
