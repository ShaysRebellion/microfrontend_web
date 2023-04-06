import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum ResponseStatus {
  SUCCESS,
  FETCH_WALLET_TRANSACTION_HISTORY_FAIL,
}

registerEnumType(ResponseStatus, {
  name: 'ResponseStatus',
});

@InputType()
export class WalletInfoInput {
  @Field(() => String)
  walletAddress: string;
}

@ObjectType()
export class WalletInfo {
  @Field(() => String)
  walletAddress: string;

  @Field(() => Boolean)
  isOld: boolean;

  @Field(() => Int)
  lastTransactionTimestamp: number;

  @Field(() => ResponseStatus)
  responseStatus: ResponseStatus;
}
