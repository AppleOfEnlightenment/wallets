import { WalletType } from '@AppleOfEnlightenment/api';
import type { Wallet } from '@AppleOfEnlightenment/api';
import { useGetWalletsQuery, useGetCatListQuery } from '@AppleOfEnlightenment/api-react';
import { useCurrencyCode } from '@AppleOfEnlightenment/core';
import { useMemo } from 'react';

export default function useWallet(walletId?: number | string): {
  loading: boolean;
  wallet?: Wallet;
  unit?: string;
} {
  const currencyCode = useCurrencyCode();
  const { data: wallets, isLoading } = useGetWalletsQuery();
  const { data: catList = [], isLoading: isCatListLoading } = useGetCatListQuery();

  const wallet = useMemo(
    () => wallets?.find((item) => item.id.toString() === walletId?.toString()),
    [wallets, walletId]
  );

  const unit = useMemo(() => {
    if (wallet) {
      if (!isCatListLoading && wallet.type === WalletType.CAT) {
        const token = catList.find((item) => item.assetId === wallet.meta?.assetId);
        if (token) {
          return token.symbol;
        }

        return undefined;
      }

      return currencyCode;
    }
    return undefined;
  }, [wallet, isCatListLoading, currencyCode, catList]);

  return {
    wallet,
    loading: isLoading,
    unit,
  };
}
