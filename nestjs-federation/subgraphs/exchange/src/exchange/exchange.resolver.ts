import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BalanceInfo,
  BalanceInfoInput,
  ExchangeRate,
  GetExchangeRateInput,
  SetExchangeRateInput,
} from './exchange.model';
import { BalanceInfoService, ExchangeRateService } from './exchange.service';

@Resolver(() => ExchangeRate)
export class ExchangeResolver {
  constructor(private exchangeRateService: ExchangeRateService) {}

  @Query(() => ExchangeRate)
  getExchangeRate(
    @Args('getExchangeRateInput') getExchangeRateInput: GetExchangeRateInput,
  ): ExchangeRate {
    const { exchangeRateType } = getExchangeRateInput;
    return this.exchangeRateService.getExchangeRate(exchangeRateType);
  }

  @Mutation(() => ExchangeRate)
  setExchangeRate(
    @Args('setExchangeRateInput') setExchangeRateInput: SetExchangeRateInput,
  ): ExchangeRate {
    const { exchangeRateType, exchangeRate } = setExchangeRateInput;
    return this.exchangeRateService.setExchangeRate(
      exchangeRateType,
      exchangeRate,
    );
  }
}

@Resolver(() => BalanceInfo)
export class BalanceInfoResolver {
  constructor(
    private exchangeRateService: ExchangeRateService, // singleton dependency injection: https://docs.nestjs.com/fundamentals/injection-scopes
    private balanceInfoService: BalanceInfoService,
  ) {}

  @Query(() => BalanceInfo)
  async getBalanceInfo(
    @Args('balanceInfoInput') getBalanceInfoInput: BalanceInfoInput,
  ): Promise<BalanceInfo> {
    const { walletAddress, exchangeRateType } = getBalanceInfoInput;
    const { exchangeRate } =
      this.exchangeRateService.getExchangeRate(exchangeRateType);

    return await this.balanceInfoService.getBalanceInfo(
      walletAddress,
      exchangeRateType,
      exchangeRate,
    );
  }
}
