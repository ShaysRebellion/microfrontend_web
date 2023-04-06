import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BalanceInfo = {
  __typename?: 'BalanceInfo';
  balance: Scalars['Float'];
  exchangeRate: Scalars['Float'];
  exchangeRateType: ExchangeRateType;
  responseStatus: ResponseStatus;
  walletAddress: Scalars['String'];
};

export type BalanceInfoInput = {
  exchangeRateType: ExchangeRateType;
  walletAddress: Scalars['String'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  exchangeRate: Scalars['Float'];
  exchangeRateType: ExchangeRateType;
  responseStatus: ResponseStatus;
};

export enum ExchangeRateType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type GetExchangeRateInput = {
  exchangeRateType: ExchangeRateType;
};

export type Mutation = {
  __typename?: 'Mutation';
  setExchangeRate: ExchangeRate;
};


export type MutationSetExchangeRateArgs = {
  setExchangeRateInput: SetExchangeRateInput;
};

export type Query = {
  __typename?: 'Query';
  getBalanceInfo: BalanceInfo;
  getExchangeRate: ExchangeRate;
  getWalletInfo: WalletInfo;
};


export type QueryGetBalanceInfoArgs = {
  balanceInfoInput: BalanceInfoInput;
};


export type QueryGetExchangeRateArgs = {
  getExchangeRateInput: GetExchangeRateInput;
};


export type QueryGetWalletInfoArgs = {
  walletInfoInput: WalletInfoInput;
};

export enum ResponseStatus {
  FetchWalletBalanceFail = 'FETCH_WALLET_BALANCE_FAIL',
  FetchWalletTransactionHistoryFail = 'FETCH_WALLET_TRANSACTION_HISTORY_FAIL',
  InvalidExchangeRate = 'INVALID_EXCHANGE_RATE',
  Success = 'SUCCESS'
}

export type SetExchangeRateInput = {
  exchangeRate: Scalars['Float'];
  exchangeRateType: ExchangeRateType;
};

export type WalletInfo = {
  __typename?: 'WalletInfo';
  isOld: Scalars['Boolean'];
  lastTransactionTimestamp: Scalars['Int'];
  responseStatus: ResponseStatus;
  walletAddress: Scalars['String'];
};

export type WalletInfoInput = {
  walletAddress: Scalars['String'];
};

export type GetWalletInfoQueryVariables = Exact<{
  walletInfoInput: WalletInfoInput;
}>;


export type GetWalletInfoQuery = { __typename?: 'Query', getWalletInfo: { __typename?: 'WalletInfo', walletAddress: string, isOld: boolean, lastTransactionTimestamp: number, responseStatus: ResponseStatus } };

export type GetBalanceInfoQueryVariables = Exact<{
  balanceInfoInput: BalanceInfoInput;
}>;


export type GetBalanceInfoQuery = { __typename?: 'Query', getBalanceInfo: { __typename?: 'BalanceInfo', balance: number, responseStatus: ResponseStatus } };

export type GetExchangeRateQueryVariables = Exact<{
  getExchangeRateInput: GetExchangeRateInput;
}>;


export type GetExchangeRateQuery = { __typename?: 'Query', getExchangeRate: { __typename?: 'ExchangeRate', exchangeRateType: ExchangeRateType, exchangeRate: number, responseStatus: ResponseStatus } };

export type SetExchangeRateMutationVariables = Exact<{
  setExchangeRateInput: SetExchangeRateInput;
}>;


export type SetExchangeRateMutation = { __typename?: 'Mutation', setExchangeRate: { __typename?: 'ExchangeRate', exchangeRateType: ExchangeRateType, exchangeRate: number, responseStatus: ResponseStatus } };


export const GetWalletInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWalletInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletInfoInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WalletInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWalletInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletInfoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletInfoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isOld"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"responseStatus"}}]}}]}}]} as unknown as DocumentNode<GetWalletInfoQuery, GetWalletInfoQueryVariables>;
export const GetBalanceInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBalanceInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"balanceInfoInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BalanceInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBalanceInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"balanceInfoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"balanceInfoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"responseStatus"}}]}}]}}]} as unknown as DocumentNode<GetBalanceInfoQuery, GetBalanceInfoQueryVariables>;
export const GetExchangeRateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExchangeRate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getExchangeRateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetExchangeRateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExchangeRate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getExchangeRateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getExchangeRateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeRateType"}},{"kind":"Field","name":{"kind":"Name","value":"exchangeRate"}},{"kind":"Field","name":{"kind":"Name","value":"responseStatus"}}]}}]}}]} as unknown as DocumentNode<GetExchangeRateQuery, GetExchangeRateQueryVariables>;
export const SetExchangeRateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetExchangeRate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setExchangeRateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetExchangeRateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setExchangeRate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setExchangeRateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setExchangeRateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeRateType"}},{"kind":"Field","name":{"kind":"Name","value":"exchangeRate"}},{"kind":"Field","name":{"kind":"Name","value":"responseStatus"}}]}}]}}]} as unknown as DocumentNode<SetExchangeRateMutation, SetExchangeRateMutationVariables>;