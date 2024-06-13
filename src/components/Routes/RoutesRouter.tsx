import { lazily } from 'react-lazily'
import { createBrowserRouter } from 'react-router-dom'

import { paths } from '@shared/paths'

import { ErrorBoundaryLayout } from '@layouts/ErrorBoundaryLayout/ErrorBoundaryLayout'

const { NotFoundPage } = lazily(
	() => import(/* webpackChunkName: "NotFoundPage" */ '@pages/NotFoundPage/NotFoundPage'),
)

const { ReviewsPage } = lazily(
	() => import(/* webpackChunkName: "ReviewsPage" */ '@pages/ReviewsPage/ReviewsPage'),
)

// Charts

const { ChartsPage } = lazily(
	() => import(/* webpackChunkName: "WordcloudPage" */ '@pages/ChartsPage/ChartsPage'),
)

const { ChartsPageContentWordcloud } = lazily(
	() =>
		import(
			/* webpackChunkName: "WordcloudPage" */ '@pages/ChartsPage/ChatsPageContent/ChartsPageContentWordcloud'
		),
)

const { AboutUsPage } = lazily(
	() => import(/* webpackChunkName: "AboutUsPage" */ '@pages/AboutUsPage/AboutUsPage'),
)

const routes = [
	{
		element: <ErrorBoundaryLayout />,
		children: [
			{
				path: paths.any,
				element: <NotFoundPage />,
			},
			{
				path: paths.reviews,
				element: <ReviewsPage />,
			},
			{
				path: paths.wordcloud,
				element: (
					<ChartsPage>
						<ChartsPageContentWordcloud />
					</ChartsPage>
				),
			},
			{
				path: paths.aboutUs,
				element: <AboutUsPage />,
			},
		],
	},
]

export const router = createBrowserRouter(routes)
