import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage'

export const ErrorBoundaryLayout = () => (
	<ErrorBoundary fallback={<NotFoundPage />}>
		<Outlet />
	</ErrorBoundary>
)
