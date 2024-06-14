import { lazily } from 'react-lazily'
import { createBrowserRouter } from 'react-router-dom'

import { paths } from '@shared/paths'

import { ErrorBoundaryLayout } from '@layouts/ErrorBoundaryLayout/ErrorBoundaryLayout'

const { NotFoundPage } = lazily(
	() => import(/* webpackChunkName: "NotFoundPage" */ '@pages/NotFoundPage/NotFoundPage'),
)

const { AboutUsPage } = lazily(
	() => import(/* webpackChunkName: "AboutUsPage" */ '@pages/AboutUsPage/AboutUsPage'),
)

const { ReviewsPage } = lazily(
	() => import(/* webpackChunkName: "ReviewsPage" */ '@pages/ReviewsPage/ReviewsPage'),
)

// Charts

const { ChartsPage } = lazily(
	() => import(/* webpackChunkName: "ChartsPage" */ '@pages/ChartsPage/ChartsPage'),
)

const { ChartsPageContentWordcloud } = lazily(
	() =>
		import(
			/* webpackChunkName: "ChartsPageContentWordcloud" */ '@pages/ChartsPage/ChatsPageContent/ChartsPageContentWordcloud'
		),
)
const { ChartsPageContentReviewsScores } = lazily(
	() =>
		import(
			/* webpackChunkName: "ChartsPageContentReviewsScores" */ '@pages/ChartsPage/ChatsPageContent/ChartsPageContentReviewsScores'
		),
)

const { ChartsPageContentAvgCarScores } = lazily(
	() =>
		import(
			/* webpackChunkName: "ChartsPageContentAvgCarScores" */ '@pages/ChartsPage/ChatsPageContent/ChartsPageContentAvgCarScores'
		),
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
				path: paths.aboutUs,
				element: <AboutUsPage />,
			},
			{
				path: paths.reviews,
				element: <ReviewsPage />,
			},
			// Charts
			{
				path: paths.wordcloud,
				element: (
					<ChartsPage>
						<ChartsPageContentWordcloud />
					</ChartsPage>
				),
			},
			{
				path: paths.reviewsScores,
				element: (
					<ChartsPage>
						<ChartsPageContentReviewsScores />
					</ChartsPage>
				),
			},
			{
				path: paths.avgCarScores,
				element: (
					<ChartsPage>
						<ChartsPageContentAvgCarScores />
					</ChartsPage>
				),
			},
		],
	},
]

export const router = createBrowserRouter(routes)
