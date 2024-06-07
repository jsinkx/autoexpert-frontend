import { MainLayout } from '@layouts/MainLayout/MainLayout'

import WHITE_CAT_DRIVE_GIF from '@assets/images/white-cat-drive.gif'

import { StyledNotFoundPage } from './NotFoundPage.styles'

export const NotFoundPage = () => {
	return (
		<MainLayout>
			<StyledNotFoundPage>
				<h2 className="page__title">Страница не найдена </h2>
				<img className="page__image" src={WHITE_CAT_DRIVE_GIF} alt="404" />
			</StyledNotFoundPage>
		</MainLayout>
	)
}
