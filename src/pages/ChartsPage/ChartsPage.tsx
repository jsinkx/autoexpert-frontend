import { FC, ReactNode } from 'react'

import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { StyledChartsPage } from './ChartsPage.styles'

type ChartsPageProps = {
	children: ReactNode
}

export const ChartsPage: FC<ChartsPageProps> = ({ children }) => {
	return (
		<MainLayout>
			<StyledChartsPage>{children}</StyledChartsPage>
		</MainLayout>
	)
}
