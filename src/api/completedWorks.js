// import api from './axios'

export default {
  all: () => {
    return { data: { data: [
      { id: 1, work: { id: 1, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях' }, title: 'Бібліографічне описання', reference: 'Посилання', number_of_hours: 12, season: 'Весна', created_at: new Date(2019, 11, 24) },
      { id: 2, work: { id: 1, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях' }, title: 'Бібліографічне описання', reference: 'Посилання', number_of_hours: 12, season: 'Весна', created_at: new Date(2019, 11, 23) },
      { id: 3, work: { id: 2, name: 'Керівництво студентів з підготовкою тез доповідей на інших конференціях' }, title: 'Бібліографічне описання', reference: 'Посилання', number_of_hours: 12, season: 'Осінь', created_at: new Date(2019, 11, 23) }
    ] } }
  },

  get: (id) => {
    return { data: { data:
          { id: id, work: { id: 23, name: 'Керівництво студентів з підготовкою тез доповідей на міжнародних конференціях', type: 'Керівництво' }, title: 'Бібліографічне описання', reference: 'Посилання', number_of_hours: 12, season: 'Весна', created_at: new Date(2019, 11, 24) }
    } }
  },

  create: (data) => {
    return { data: { data: { message: 'Item created' } } }
  },

  update: (id, data) => {
    return { data: { data: { message: 'Item updated' } } }
  },

  delete: (id) => {
    return { data: { data: { message: 'Item deleted' } } }
  }
}
