import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'

import './index.css'
import { MovieDetails, MovieSearch } from 'screens'
import Sentry from './sentry'
import ThemeConfig from './theme'

const container = document.getElementById('root')!
const root = createRoot(container)

const defaultTheme = createTheme(ThemeConfig)

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

root.render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<main>
					<SentryRoutes>
						<Route path="/" element={<MovieSearch />} />
						<Route path="/movie/:id/:tconst" element={<MovieDetails />} />
					</SentryRoutes>
				</main>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
)
