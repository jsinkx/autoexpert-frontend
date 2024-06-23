import { Loader } from '@components/Loader/Loader'

import { StyledLoadingPage } from './LoadingPage.styles'

const LOADER_SIZE = '200'

export const LoadingPage = () => {
	return (
		<StyledLoadingPage>
			<title> Загрузка - Автоэксперт </title>
			<div className="main__loader">
				<Loader variant="loader" height={LOADER_SIZE} width={LOADER_SIZE} />
			</div>
		</StyledLoadingPage>
	)
}
