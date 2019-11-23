// import api from './axios'

export default {
  getForUser: (userId) => {
    return {
      data: {
        data: [
          {
            id: 1,
            work: { id: 1, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях' },
            quantity: 1,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          },
          {
            id: 2,
            work: { id: 1, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях' },
            quantity: 2,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          },
          {
            id: 3,
            work: { id: 1, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях' },
            quantity: 2,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          }
        ]
      }
    }
  }
}
