import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import React from 'react'

import './index.css'
import { MovieDetails, MovieSearch } from 'screens'

const container = document.getElementById('root')
const root = createRoot(container)
const defaultTheme = createTheme()

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<main>
					<Routes>
						<Route path="/" element={<MovieSearch />} />
						<Route path="/movie/:id/:tconst" element={<MovieDetails />} />
					</Routes>
				</main>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
