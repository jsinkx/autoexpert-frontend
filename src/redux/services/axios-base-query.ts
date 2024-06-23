import type { AxiosError, AxiosRequestConfig } from 'axios'

import type { BaseQueryFn } from '@reduxjs/toolkit/query'

import { axiosInstance } from '@shared/axios'

export const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string
		} & AxiosRequestConfig,
		unknown,
		unknown
	> =>
	async ({ url, ...config }) => {
		try {
			const result = await axiosInstance(url, config)

			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
