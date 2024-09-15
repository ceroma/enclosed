/* @refresh reload */

import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from '@kobalte/core/color-mode';
import { Router } from '@solidjs/router';
import { render, Suspense } from 'solid-js/web';
import { ConfigProvider } from './modules/config/config.provider';
import { I18nProvider } from './modules/i18n/i18n.provider';
import { NoteContextProvider } from './modules/notes/notes.context';
import { routes } from './routes';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './app.css';

render(
  () => {
    const initialColorMode = 'system';
    const colorModeStorageKey = 'enclosed_color_mode';
    const localStorageManager = createLocalStorageManager(colorModeStorageKey);

    return (
      <Router
        children={routes}
        root={props => (
          <Suspense>
            <ConfigProvider>
              <I18nProvider>
                <NoteContextProvider>
                  <ColorModeScript storageType={localStorageManager.type} storageKey={colorModeStorageKey} initialColorMode={initialColorMode} />
                  <ColorModeProvider
                    initialColorMode={initialColorMode}
                    storageManager={localStorageManager}
                  >
                    <div class="min-h-screen font-sans text-sm font-400">{props.children}</div>
                  </ColorModeProvider>
                </NoteContextProvider>
              </I18nProvider>
            </ConfigProvider>
          </Suspense>
        )}
      />
    );
  },
  document.getElementById('root')!,
);
