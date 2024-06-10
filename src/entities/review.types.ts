export type ReviewId = string

export type ReviewKeyWord = {
	deprel: string
	word: string
	lemma: string
	start_char: number
	end_char: number
	text_id: string
}

export type ReviewAdjective = {
	deprel: string
	word: string
	lemma: string
	start_char: number
	end_char: number
	negative: boolean
}

export type Review = {
	id: ReviewId
	text: string
	brand: string
	model: string
	body: string
	score: string
	source: string
	sourceUrl: string
}

// "663527550a04ef46f3d9d8b3": {
// 		"adjectives": [
// 			{
// 				"key_word": {
// 					"deprel": "nsubj",
// 					"word": "машина",
// 					"lemma": "машина",
// 					"start_char": 236,
// 					"end_char": 242,
// 					"text_id": "663527550a04ef46f3d9d8b3"
// 				},
// 				"adjective": {
// 					"deprel": "amod",
// 					"word": "надежная",
// 					"lemma": "надежный",
// 					"start_char": 226,
// 					"end_char": 234,
// 					"negative": false
// 				},
// 				"_id": "663af9888bd70a05162bc587"
// 			}
// 		],
// 		"text": {
// 			"text": "Назвать автомобиль лучше так: «Тихий ужас». Куплен новым в салоне 27.04.21. Покрыта керамикой, забронированы: фары, ручки, капот(ручки и капот бронька была допом, криво жуть, все было переделано нормально). Знал бы что такая «надежная» машина, хрен бы купил. Значит на данный момент: капот заржавел (покрашен по гарантии после скандала), сиденья кожаные( вернее не пойми какие, по внешнему виду они прошли тысяч 150), руль начал стираться, ошибки: не видит ключ, не работает Музыка, не прибавляется громкость или гаснет дисплеи, выключаются фары, горят датчики давления шин, горят другие датчики когда хотят; в целом дилера все эти проблемы не волнуют). К покупке новым не рекомендую. Брать Б/У когда все косяки устранены. Форд эксплорер 2007 года меньше проблем доставляет чем этот «шикарный» автомобиль. ",
// 			"mark": "Kia",
// 			"model": "K5",
// 			"link": "https://auto.ru/review/cars/kia/k5/22462291/694953890766245892/",
// 			"body_type": "SEDAN",
// 			"source": "auto.ru",
// 			"text_sentiment": {
// 				"label": "NEUTRAL",
// 				"score": 1
// 			}
// 		}
// 	},
