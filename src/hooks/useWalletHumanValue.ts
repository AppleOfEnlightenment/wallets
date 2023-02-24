import type { Wallet } from '@AppleOfEnlightenment/api';
import { WalletType } from '@AppleOfEnlightenment/api';
import { mojoToCATLocaleString, mojoToChiaLocaleString, useLocale } from '@AppleOfEnlightenment/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

export default function useWalletHumanValue(
  wallet: Wallet,
  value?: string | number | BigNumber,
  unit?: string
): string {
  const [locale] = useLocale();

  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue =
        wallet.type === WalletType.CAT ? mojoToCATLocaleString(value, locale) : mojoToChiaLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
