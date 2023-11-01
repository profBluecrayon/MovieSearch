import { decode } from 'html-entities'
import { logEvent } from 'firebase/analytics'
import axios from 'axios'

import { analytics } from '../firebase'
import { flattenObject } from 'utils'

const RequestType = {
	Request: 'Request',
	Response: 'Response',
}

const logAnalytics = (data = {}, exchange = {}, suffixText = '') => {
	// Can't use nested objects, have to flatten or stringify all data, otherwise analytics will ignore
	const flattenedData = flattenObject(data)

	// Take first and last words (split by '/')
	// If last word is an id, or first word (/bills) then ignore last word
	const urlParts = exchange.url?.split('/')
	const entityName = urlParts?.[1] || ''
	const temp = urlParts?.[urlParts.length - 1] || ''
	const entityTarget = /\d/.test(temp) ? '' : temp
	const description = entityName !== entityTarget ? `${entityName}${entityTarget}` : entityName
	const eventName = `${exchange.method}${description}${suffixText}`

	console.log(eventName, {
		...flattenedData,
		endpoint: `${exchange.method} ${exchange.url}`,
	})

	logEvent(analytics, eventName, {
		...flattenedData,
		endpoint: `${exchange.method} ${exchange.url}`,
	})
}

const createClient = () => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_themoviedb_readAccessToken}`,
	}

	const client = axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers,
	})

	client.interceptors.request.use(
		async (request) => {
			logAnalytics(request?.data, request)

			const requestObj = {
				type: RequestType.Request,
				method: request.method?.toUpperCase(),
				url: `${request.baseURL}${request.url || ''}`,
			}
			if (request?.data) {
				requestObj['data'] = request?.data
			}

			console.log(JSON.stringify(requestObj))

			return request
		},
		(error) => {
			const requestObj = {
				type: RequestType.Request,
				message: error?.message,
			}

			console.error(JSON.stringify(requestObj))

			return Promise.reject(error)
		},
	)

	client.interceptors.response.use(
		(response) => {
			const responseObj = {
				type: RequestType.Response,
				method: response.config.method?.toUpperCase(),
				status: response.status,
				url: `${response.config.baseURL}${response.config.url || ''}`,
				data: JSON.stringify(response.data).slice(0, 1000),
			}

			console.log(JSON.stringify(responseObj))

			return response
		},
		async (error) => {
			console.log({ error })

			const responseObj = {
				type: RequestType.Response,
				method: error?.response?.config.method?.toUpperCase(),
				status: error?.response?.status,
				url: `${error?.response?.config.baseURL}${error?.response?.config.url || ''}`,
				message: error?.message,
			}

			if (error?.response?.data) {
				responseObj['responseData'] = error?.response?.data
			}

			if (error.config.data) {
				responseObj['requestData'] = error.config.data
			}

			const { response, message } = error
			logAnalytics({ response, message }, error?.response?.config, '_serverError')

			console.error(JSON.stringify(responseObj))

			const newError = error?.response?.data?.error || error || {}
			if (newError.message) {
				newError.message = decode(newError.message)
			}

			return Promise.reject(newError)
		},
	)

	return client
}

export const http = () => {
	return createClient()
}
