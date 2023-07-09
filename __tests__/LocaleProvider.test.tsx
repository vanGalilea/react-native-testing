import React from 'react';
import {render, act} from '@testing-library/react-native';
import LocaleProvider from '../src/LocaleProvider';
import * as utils from '../src/utils';

jest.mock('../src/utils', () => ({
  getExistingLocale: jest.fn().mockReturnValue({
    language: 'en',
    region: 'US',
    rtl: false,
  }),
  getTranslations: jest.fn().mockReturnValue(en_US),
}));

describe('<LocaleProvider />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const locales: ILocale[] = [
    {
      language: 'en',
      region: 'UK',
      translations: en_UK,
    },
    {
      language: 'en',
      region: 'US',
      translations: en_US,
    },
    {
      language: 'fr',
      region: 'FR',
      translations: fr_FR,
    },
  ];

  const selectedLocale: ISelectedLocale = {
    language: 'en',
    region: 'US',
    rtl: false,
  };

  test(`initializeLocale sets the current locale based on what's returned from the getExistingLocale function call`, async () => {
    const fetchLocaleMock = jest.fn().mockReturnValue(undefined);
    const persistLocaleMock = jest.fn();

    render(
      <LocaleProvider
        selectedLocale={selectedLocale}
        initialList={locales}
        fetchLocaleCache={fetchLocaleMock}
        persistLocaleCache={persistLocaleMock}
        refreshTime={REFRESH_TIME.ONE_DAY}></LocaleProvider>,
    );
    await act(async () => {
      await pause();
    });

    expect(utils.getExistingLocale).toHaveBeenCalled();
    expect(utils.getExistingLocale).toHaveBeenCalledTimes(1);
  });
});

const pause = () => new Promise(resolve => setTimeout(resolve, 100));
