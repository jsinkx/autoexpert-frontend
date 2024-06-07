import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { StyledNotFoundPage } from './NotFoundPage.styles'

export const NotFoundPage = () => {
	return (
		<MainLayout>
			<StyledNotFoundPage>
				<h2>Not found</h2>
			</StyledNotFoundPage>
		</MainLayout>
	)
}
