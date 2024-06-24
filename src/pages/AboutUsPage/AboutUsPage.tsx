import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { ContactCard } from '@components/ContactCard/ContactCard'

import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

import ARTEMIY_IMAGE from '@assets/images/artemiy.webp'
import KOSTYA_IMAGE__SECOND from '@assets/images/kostya-2.webp'
import KOSTYA_IMAGE from '@assets/images/kostya.webp'

import { StyledAboutUsPage } from './AboutUsPage.styles'

const CONTACTS = [
	{
		id: 0,
		name: 'Константин Леманский',
		role: 'Автор идеи, автоэксперт, предприниматель',
		telegramLink: 'https://t.me/koty36',
		githubLink: 'https://github.com/s21dlemanskiy',
		image: KOSTYA_IMAGE,
	},
	{
		id: 1,
		name: 'Костя Леманский',
		role: 'Backend разработчик, ML инженер',
		telegramLink: 'https://t.me/koty36',
		githubLink: 'https://github.com/s21dlemanskiy',
		image: KOSTYA_IMAGE__SECOND,
	},
	{
		id: 2,
		name: 'Артемий Воронин',
		role: 'Frontend разработчик',
		telegramLink: 'https://t.me/jsink',
		githubLink: 'https://github.com/jsinkx',
		image: ARTEMIY_IMAGE,
	},
]

export const AboutUsPage = () => {
	return (
		<MainLayout>
			<title> О нас - Автоэксперт </title>
			<StyledAboutUsPage>
				<div className="page__content">
					<h2 className="title"> Команда </h2>
					<section className="contacts">
						{CONTACTS.map(({ id, ...contact }) => (
							<ContactCard key={id} {...contact} className="contacts__contact" />
						))}
					</section>
					<h2 className="title"> О приложении </h2>
					<section className="posts">
						<div className="posts__post">
							<div className="posts__post__right-info">
								<FormatQuoteIcon color="primary" className="posts__post__right-info__quote" />
							</div>
							<p className="posts__post__paragraph">
								<span className="span--color-blue"> Однажды </span> я задумался о покупке нового{' '}
								<span className="span--color-blue"> Lamborghini Urus </span>. Для грамотного выбора мне бы
								понадобилось изучить очень много информации, отзывов и видео на разных источниках об этом автомобиле,
								времени бы это заняло очень много. <span className="span--color-blue"> Именно поэтому </span> я
								придумал разработать это приложение. Умный парсер авито, авто.ру и дром, мощная обученная нейросеть и
								приложение с дружелюбным пользовательским интерфейсом.{' '}
								<span className="span--color-blue"> Только мы </span>можем предложить столь крутой функционал в одном
								месте.
							</p>
							<p className="posts__post__paragraph">
								<span className="span--color-blue"> Мне нравится создовать </span> что-то, и видеть результат. Для
								меня внефукультативное програмирование началось с создания игр. Вскоре я стал создавать и другие
								приложения, например рандомайзер для разделения людей на группы. Поэтому{' '}
								<span className="span--color-blue"> Python</span>: язык на котором можно написать все стал для меня
								основным. Но после я погрузился в более грубокое изучение работы приложений. Так, например, узнал как
								работает рендер. И, да, мне до сих пор нравится создавать что-то готовое, но теперь я стараюсь не
								только создать, но и понять как будет работать мое приложение.{' '}
							</p>
							<p className="posts__post__author"> Константин Леманский</p>
						</div>
					</section>
				</div>
			</StyledAboutUsPage>
		</MainLayout>
	)
}
