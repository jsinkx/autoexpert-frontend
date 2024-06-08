import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { router } from './RoutesRouter'

export const Routes = () => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<RouterProvider router={router} />
		</Suspense>
	)
}
