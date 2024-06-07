import { FC, ReactNode } from 'react'

import { Footer } from '@components/Footer/Footer'
import { Header } from '@components/Header/Header'

import { StyledMainLayout } from './MainLayout.styles'

type MainLayoutProps = {
	children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<StyledMainLayout>
			<Header className="main-layout__header" />
			<main className="main-layout__main-content">{children}</main>
			<Footer className="main-layout__footer" />
		</StyledMainLayout>
	)
}
