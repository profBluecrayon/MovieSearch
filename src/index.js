import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import React from 'react'

import './index.css'
import { MovieDetails, MovieSearch } from 'screens'
import { Sentry } from 'helpers'

const container = document.getElementById('root')
const root = createRoot(container)
const defaultTheme = createTheme()

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

root.render(
	<React.StrictMode>
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
	</React.StrictMode>,
)
