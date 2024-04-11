import type { AppProps } from 'next/app'

import '#/ui/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default MyApp
