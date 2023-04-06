import { Module } from '@nestjs/common';
import { BalanceInfoResolver, ExchangeResolver } from './exchange.resolver';
import { BalanceInfoService, ExchangeRateService } from './exchange.service';

@Module({
  imports: [],
  providers: [
    BalanceInfoResolver,
    BalanceInfoService,
    ExchangeResolver,
    ExchangeRateService,
  ],
})
export class ExchangeModule {}
