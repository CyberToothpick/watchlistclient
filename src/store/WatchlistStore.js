import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._movies = []
    makeAutoObservable(this)
  }

  setMovies(movies) {
    this._movies = movies
  }

  get movies() {
    return this._movies
  }
}
