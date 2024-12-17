import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'XDDDDDDD';  
  private apiUrl = 'https://www.omdbapi.com/';  
  private favoritesSubject = new BehaviorSubject<any[]>(this.getFavorites());
  private watchedMoviesSubject = new BehaviorSubject<any[]>(this.getWatchedMovies());

  public favorites$ = this.favoritesSubject.asObservable();
  public watchedMovies$ = this.watchedMoviesSubject.asObservable();

  constructor() {}

  // Metóda na vyhľadávanie filmov podľa názvu
  async searchMovies(query: string) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          apikey: this.apiKey,
          s: query,
        }
      });

      return response.data.Search || [];
    } catch (error) {
      console.error('Chyba pri získavaní filmov:', error);
      return [];
    }
  }

  // Metóda na získanie obľúbených filmov z LocalStorage
  getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  // Metóda na získanie pozretých filmov z LocalStorage
  getWatchedMovies() {
    const watchedMovies = localStorage.getItem('watchedMovies');
    return watchedMovies ? JSON.parse(watchedMovies) : [];
  }

  // Metóda na uloženie filmu do obľúbených
  saveToFavorites(movie: any) {
    let favorites = this.getFavorites();
    if (!favorites.some((fav: any) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    }
  }

  // Metóda na vymazanie filmu z obľúbených
  removeFromFavorites(movie: any) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav: any) => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  // Metóda na označenie filmu ako pozretého s hodnotením
  markAsWatched(movie: any, rating: number) {
    if (rating < 1 || rating > 10) {
      console.log("Hodnotenie musí byť medzi 1 a 10.");
      return;
    }

    let watchedMovies = this.getWatchedMovies();
    if (!watchedMovies.some((watched: any) => watched.imdbID === movie.imdbID)) {
      watchedMovies.push({
        ...movie,
        dateAdded: new Date(),
        rating: rating  // Uložíme hodnotenie
      });
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      this.watchedMoviesSubject.next(watchedMovies);
    }
  }

  // Metóda na zoradenie pozretých filmov podľa dátumu alebo hodnotenia
  sortWatchedMovies(sortBy: string) {
    let watchedMovies = this.getWatchedMovies();
    if (sortBy === 'date') {
      watchedMovies.sort((a: any, b: any) => b.dateAdded - a.dateAdded);
    } else if (sortBy === 'rating') {
      watchedMovies.sort((a: any, b: any) => b.rating - a.rating);
    }
    this.watchedMoviesSubject.next(watchedMovies);
  }

  // Metóda na vymazanie filmu zo zoznamu pozretých
  removeWatchedMovie(movie: any) {
    let watchedMovies = this.getWatchedMovies();
    watchedMovies = watchedMovies.filter((watched: any) => watched.imdbID !== movie.imdbID);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    this.watchedMoviesSubject.next(watchedMovies);
  }
}
