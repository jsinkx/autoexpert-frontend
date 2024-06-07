import { FC, ReactNode } from 'react'

import { Footer } from '@components/Footer/Footer'
import { Header } from '@components/Header/Header'

type MainLayoutProps = {
	children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}
