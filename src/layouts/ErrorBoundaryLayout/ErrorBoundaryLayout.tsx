import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

export const ErrorBoundaryLayout = () => (
	<ErrorBoundary fallback={<h1> Error </h1>}>
		<Outlet />
	</ErrorBoundary>
)
