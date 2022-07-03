import { $authHost, $host } from './index'

export const fetchWatchlist = async () => {
  const { data } = await $authHost.get('api/watchlist')
  return data
}

export const addWatchlist = async (id) => {
  const { data } = await $authHost.post(`api/watchlist/add/${id}`)
  return data
}

export const deleteWatchlist = async (id) => {
  const { data } = await $authHost.post(`api/watchlist/delete/${id}`)
  return data
}
