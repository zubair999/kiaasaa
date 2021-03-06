import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';



// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import { getDirection } from "@utils/get-direction";

// REDUCER

import rootReducer from '../Store/Reducer/index';

const persistConfig = {
	key: 'root',
	storage,
}
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
  let persistor = persistStore(store)




function handleExitComplete() {
	if (typeof window !== "undefined") {
		window.scrollTo({ top: 0 });
	}
}

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
	const queryClientRef = useRef<any>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	const router = useRouter();
	const dir = getDirection(router.locale);
	useEffect(() => {
		document.documentElement.dir = dir;
	}, [dir]);
	const Layout = (Component as any).Layout || Noop;

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
					<QueryClientProvider client={queryClientRef.current}>
						<Hydrate state={pageProps.dehydratedState}>
							<ManagedUIContext>
								<Layout pageProps={pageProps}>
									<DefaultSeo />
									<Component {...pageProps} key={router.route} />
									<ToastContainer />
								</Layout>
								<ManagedModal />
								<ManagedDrawer />
							</ManagedUIContext>
						</Hydrate>
						{/* <ReactQueryDevtools /> */}
					</QueryClientProvider>
				</AnimatePresence>
			</PersistGate>
		</Provider>
	);
};

export default appWithTranslation(CustomApp);
