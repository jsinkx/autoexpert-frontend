import { MainLayout } from '@layouts/MainLayout/MainLayout'

import KOSTYA_IMAGE__SECOND from '@assets/images/kostya-2.webp'
import KOSTYA_IMAGE from '@assets/images/kostya.webp'

import { StyledAboutUsPage } from './AboutUsPage.styles'

export const AboutUsPage = () => {
	return (
		<MainLayout>
			<title> О нас - Автоэксперт </title>
			<StyledAboutUsPage>
				<div className="page__content">
					<div className="content__row">
						<img src={KOSTYA_IMAGE} alt="Костя" className="content__row__image" />
						<img src={KOSTYA_IMAGE__SECOND} alt="Костя" className="content__row__image" />
					</div>
					<p>
						<span className="span--color-blue span--underline"> Константин Леманский </span> - автор идеи,
						разработчик, предприниматель
					</p>
					<p>
						<span className="span--color-blue"> Однажды </span> я задумался о покупке нового{' '}
						<span className="span--color-blue"> Lamborghini Urus </span>. Для грамотного выбора мне бы понадобилось
						изучить очень много информации, отзывов и видео на разных источниках об этом автомобиле, времени бы это
						заняло очень много. <span className="span--color-blue"> Именно поэтому </span> я придумал разработать
						это приложение. Умный парсер авито, авто.ру и дром, мощная обученная нейросеть и приложение с
						дружелюбным пользовательским интерфейсом. <span className="span--color-blue"> Только мы </span>можем
						предложить столь крутой функционал в одном месте.
					</p>
					<p>
						<span className="span--color-blue"> Мне нравится создовать </span> что-то, и видеть результат. Для меня
						внефукультативное програмирование началось с создания игр. Вскоре я стал создавать и другие приложения,
						например рандомайзер для разделения людей на группы. Поэтому Python: язык на котором можно написать все
						стал для меня основным. Но после я погрузился в более грубокое изучение работы приложений. Так,
						например, узнал как работает рендер. И, да, мне до сих пор нравится создавать что-то готовое, но теперь
						я стараюсь не только создать, но и понять как будет работать мое приложение.
					</p>
				</div>
			</StyledAboutUsPage>
		</MainLayout>
	)
}
