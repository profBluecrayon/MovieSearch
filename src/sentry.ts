import * as Sentry from '@sentry/react'
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'

if (process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: 'https://4b6b426f2d0501dd3612c280b1bfd30c@o4506124248678400.ingest.sentry.io/4506124249661440',
		maxValueLength: 5000,
		integrations: [
			new Sentry.BrowserTracing({
				routingInstrumentation: Sentry.reactRouterV6Instrumentation(useEffect, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes),
			}),
			new Sentry.Replay(),
		],
		tracesSampleRate: 1.0,
	})
}

export default Sentry
