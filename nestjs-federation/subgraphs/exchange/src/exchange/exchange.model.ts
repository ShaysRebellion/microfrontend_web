import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum ExchangeRateType {
  USD,
  EUR,
}

registerEnumType(ExchangeRateType, {
  name: 'ExchangeRateType',
});

export enum ResponseStatus {
  SUCCESS,
  INVALID_EXCHANGE_RATE,
  FETCH_WALLET_BALANCE_FAIL,
}

registerEnumType(ResponseStatus, {
  name: 'ResponseStatus',
});

@InputType()
export class GetExchangeRateInput {
  @Field(() => ExchangeRateType)
  exchangeRateType: ExchangeRateType;
}

@InputType()
export class SetExchangeRateInput {
  @Field(() => ExchangeRateType)
  exchangeRateType: ExchangeRateType;

  @Field(() => Float)
  exchangeRate: number;
}

@ObjectType()
export class ExchangeRate {
  @Field(() => ExchangeRateType)
  exchangeRateType: ExchangeRateType;

  @Field(() => Float)
  exchangeRate: number;

  @Field(() => ResponseStatus)
  responseStatus: ResponseStatus;
}

@InputType()
export class BalanceInfoInput {
  @Field(() => String)
  walletAddress: string;

  @Field(() => ExchangeRateType)
  exchangeRateType: ExchangeRateType;
}

@ObjectType()
export class BalanceInfo {
  @Field(() => String)
  walletAddress: string;

  @Field(() => ExchangeRateType)
  exchangeRateType: ExchangeRateType;

  @Field(() => Float)
  exchangeRate: number;

  @Field(() => Float)
  balance: number;

  @Field(() => ResponseStatus)
  responseStatus: ResponseStatus;
}
