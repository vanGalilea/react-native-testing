import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  TranslateInput,
  LocaleProviderProps,
  ISelectedLocale,
  ILocale,
} from './interfaces';
import LocaleContext from './LocaleContext';
import {
  getDeviceLocale,
  getExistingLocale,
  getNextFetchTime,
  getTranslations,
  isRtlLanguage,
  replaceParams,
} from './utils';

const LocaleProvider: LocaleProviderProps = function LocaleProvider({
  selectedLocale,
  initialList,
  fetchRemoteList,
  persistLocaleCache,
  fetchLocaleCache,
  refreshTime,
  children,
}) {
  const [currentLocale, setCurrentLocale] =
    useState<ISelectedLocale>(selectedLocale);
  const [translations, setTranslations] = useState<Record<string, string>>();

  const selectedLocaleValue = useMemo(
    () => selectedLocale || getDeviceLocale(),
    [selectedLocale],
  );

  const initializeLocale = useCallback(
    (locales: ILocale[], localeItem: ISelectedLocale) => {
      const existingLocale = getExistingLocale(locales, localeItem);
      setCurrentLocale(existingLocale);
      setTranslations(
        state => getTranslations(locales, existingLocale) || state,
      );
    },
    [],
  );

  const fetchAndPersistLocales = useCallback(async () => {
    const localeData = fetchRemoteList ? await fetchRemoteList() : null;
    if (!localeData) {
      return;
    }
    initializeLocale(localeData, selectedLocaleValue);

    await persistLocaleCache({
      locales: localeData,
      refreshTime: getNextFetchTime(refreshTime),
    });
  }, [
    fetchRemoteList,
    initializeLocale,
    persistLocaleCache,
    refreshTime,
    selectedLocaleValue,
  ]);

  const loadProvider = useCallback(async () => {
    if (!initialList && __DEV__) {
      console.warn(
        'RN locale provider needs an initial list of locales and translations to be fully functional',
      );
    }

    const cachedLocales = await fetchLocaleCache();
    const shouldFetchFromRemote =
      cachedLocales && cachedLocales.refreshTime > Date.now();

    initializeLocale(
      cachedLocales?.locales || initialList,
      selectedLocaleValue,
    );

    if (!shouldFetchFromRemote) {
      return;
    }

    fetchAndPersistLocales();
  }, [
    initialList,
    fetchLocaleCache,
    fetchAndPersistLocales,
    initializeLocale,
    selectedLocaleValue,
  ]);

  const translate = useCallback(
    (input: TranslateInput): string => {
      const fallback = input.default || input.key;
      const {key, params} = input;
      if (!translations?.[key]) {
        return fallback;
      }
      let translation = translations[key];
      if (params) {
        translation = replaceParams(translation, params);
      }
      return translation;
    },
    [translations],
  );

  const selectLocale = useCallback(
    (locales: ILocale[], language: string, region: string) => {
      const locale = locales.find(
        i => i.language === language && i.region === region,
      );
      if (!locale) {
        return;
      }
      setTranslations(locale.translations);
      setCurrentLocale({
        language: locale.language,
        region: locale.region,
        rtl: isRtlLanguage(locale.language),
      });
    },
    [],
  );

  const changeLocale = useCallback(
    async (localeLanguage: string, localeRegion: string) => {
      let locales = initialList;
      const cachedLocales = await fetchLocaleCache();
      if (cachedLocales) {
        locales = cachedLocales.locales;
      }
      selectLocale(locales, localeLanguage, localeRegion);
    },
    [fetchLocaleCache, initialList, selectLocale],
  );

  useEffect(function componentDidMount() {
    loadProvider();
    return function componentWillUnmount() {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocaleContext.Provider value={{translate, currentLocale, changeLocale}}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
