// import api from './axios'

export default {
  get: () => {
    return {
      data: {
        data: {
          id: 1,
          work: { id: 32, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях', type: 'Інше' },
          quantity: 1,
          number_of_hours: 12,
          season: 'Весна',
          created_at: new Date(2019, 11, 24)
        }
      }
    }
  },
  getForUser: () => {
    return {
      data: {
        data: [
          {
            id: 1,
            work: { id: 32, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях', type: 'Інше' },
            quantity: 1,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          },
          {
            id: 2,
            work: { id: 32, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях', type: 'Інше' },
            quantity: 2,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          },
          {
            id: 3,
            work: { id: 32, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях', type: 'Інше' },
            quantity: 2,
            number_of_hours: 12,
            season: 'Весна',
            created_at: new Date(2019, 11, 24)
          }
        ]
      }
    }
  },

  getByUser: (userId) => {
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
  },

  create: (data) => {
    return {
      data: {
        data: {
          message: 'Планову роботу збережено'
        }
      }
    }
  },

  update: (id, data) => {
    return {
      data: {
        data: {
          message: 'Планову роботу оновлено'
        }
      }
    }
  },

  delete: (id) => {
    return {
      data: {
        data: {
          message: 'Планову роботу видалено'
        }
      }
    }
  }
}
