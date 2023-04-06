import { useLazyQuery, useMutation } from '@apollo/client';
import { GetBalanceInfoDocument, GetExchangeRateDocument, GetWalletInfoDocument, ResponseStatus, SetExchangeRateDocument } from './types';
import { Button, Form, Input, Radio } from 'antd';
import { ReloadOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { ExchangeRateType } from './types';
import styles from './App.module.scss';
import { useEffect } from 'react';

const computeNumDaysHoursAgo = (lastTransactionTimestampSeconds: number) => {
  const numSecondsInMinute = 60;
  const numSecondsInHour = numSecondsInMinute * 60;
  const numSecondsInDay = numSecondsInHour * 24;

  const numSecondsSinceLastTransaction = Date.now() / 1000 - lastTransactionTimestampSeconds;
  const numDays = Math.floor(numSecondsSinceLastTransaction / numSecondsInDay);
  const numHours = Math.floor((numSecondsSinceLastTransaction - numDays * numSecondsInDay) / numSecondsInHour);

  return {
    numDays,
    numHours,
  }
}

type ExchangeRateBalanceProps = {
  walletAddress: string;
  isWalletOld: boolean;
  lastTransactionTimestampSeconds: number;
}

type ExchangeRateBalanceForm = {
  exchangeRateType: ExchangeRateType,
  exchangeRate: number;
}

const ExchangeRateBalance = (props: ExchangeRateBalanceProps) => {
  const { walletAddress, lastTransactionTimestampSeconds } = props;
  const { numDays, numHours } = computeNumDaysHoursAgo(lastTransactionTimestampSeconds);

  const [exchangeRateForm] = Form.useForm<ExchangeRateBalanceForm>();
  const exchangeRateType = Form.useWatch('exchangeRateType', exchangeRateForm);

  const [getExchangeRateQuery, { data: exchangeRateData }] = useLazyQuery(GetExchangeRateDocument);
  useEffect(() => { // Fetch/update exchange rate information every time user selects currency
    if (exchangeRateType) {
      getExchangeRateQuery({ variables: { getExchangeRateInput: { exchangeRateType: exchangeRateType } } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateType]);
  
  const [setExchangeRate] = useMutation(SetExchangeRateDocument);
  const onFinish = (values: ExchangeRateBalanceForm) => {
    const { exchangeRateType, exchangeRate } = values;
    setExchangeRate({
      variables: {
        setExchangeRateInput: {
          exchangeRateType,
          exchangeRate: 1 / exchangeRate, // UI value is USD/EURO -> ETH, want to store ETH -> USD/EURO
        }
      }
    });
  };
  useEffect(() => { // After fetch/update, populate form fields, so it displays on UI
    if (exchangeRateData) {
      const { exchangeRateType, exchangeRate } = exchangeRateData.getExchangeRate;
      exchangeRateForm.setFieldsValue({
        exchangeRateType,
        exchangeRate: 1 / exchangeRate, // Value is ETH -> USD/EURO, want to display USD/EURO -> ETH
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateData]);

  const [balanceInfoQuery, { data: balanceInfoData }] = useLazyQuery(GetBalanceInfoDocument);
  useEffect(() => { // Fetch/refetch balance every time updates exchange rate type or value
    if (exchangeRateData) {
      const { exchangeRateType } = exchangeRateData.getExchangeRate;
      balanceInfoQuery({
        variables: {
          balanceInfoInput: {
            walletAddress,
            exchangeRateType,
          },
        },
        fetchPolicy: 'network-only', // Don't use Apollo client cache values
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateData]);

  return (
    <div className={styles.exchangeRateBalance}>
      <div className={styles.walletStatus}>
        <WarningOutlined />
        <div>{`Last Transaction: ${numDays} days, ${numHours} hours ago`}</div>
      </div>
      <Form
        className={styles.exchangeRateForm}
        form={exchangeRateForm}
        onFinish={onFinish}
      >
        <Form.Item name="exchangeRateType">
          <Radio.Group>
            <Radio value={ExchangeRateType.Usd}>{'USD ($)'}</Radio>
            <Radio value={ExchangeRateType.Eur}>{'EUR (€)'}</Radio>
          </Radio.Group>
        </Form.Item>
        {exchangeRateData?.getExchangeRate.responseStatus === ResponseStatus.Success ?
          <>
            <Form.Item
              name="exchangeRate"
              rules={[{
                validator: (_, value) =>  value > 0 ?
                  Promise.resolve() :
                  Promise.reject(new Error('Please enter valid exchange rate'))
              }]}>
                <Input placeholder="Enter exchange rate here"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <ReloadOutlined />
                </Button>
              </Form.Item> 
          </>: null}
      </Form>
      {balanceInfoData?.getBalanceInfo.responseStatus === ResponseStatus.Success ?
        <div className={styles.balanceDisplay}>
          <div>{`Balance: ${exchangeRateType === ExchangeRateType.Usd ? '$' : '€'}${balanceInfoData.getBalanceInfo.balance.toFixed(2)}`}</div>
        </div> : null}
    </div>
  );
};

type SearchForm = {
  walletAddress: string;
}

const App = () => {
  const [searchForm] = Form.useForm<SearchForm>();

  const [walletInfoQuery, { data: walletInfoData }] = useLazyQuery(GetWalletInfoDocument);
  const onFinish = (values: SearchForm) => {
    const { walletAddress } = values;
    walletInfoQuery({
      variables: { walletInfoInput: { walletAddress }}
    });
  };

  return (
    <div className={styles.app}>
      <Form className={styles.searchForm} form={searchForm} onFinish={onFinish}>
        <Form.Item name="walletAddress" rules={[{ required: true, message: 'Please enter an address' }]}>
          <Input placeholder='Enter address here'/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
      {walletInfoData?.getWalletInfo.responseStatus === ResponseStatus.Success ?
        <ExchangeRateBalance
          walletAddress={walletInfoData.getWalletInfo.walletAddress}
          isWalletOld={walletInfoData.getWalletInfo.isOld}
          lastTransactionTimestampSeconds={walletInfoData.getWalletInfo.lastTransactionTimestamp}
        /> : null}
    </div>
  );
}

export default App;
