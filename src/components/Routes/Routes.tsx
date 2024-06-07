import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from './RoutesRouter'

export const Routes = () => {
	return (
		<Suspense fallback={null}>
			<RouterProvider router={router} />
		</Suspense>
	)
}
