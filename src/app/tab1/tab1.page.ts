import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  query: string = '';            // Premenná pre vyhľadávanie filmov
  movies: any[] = [];            // Uložíme filmy, ktoré sa vrátia zo služby
  rating: number | null = null;  // Hodnotenie bude null, ak nie je nastavené

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  // Metóda pre vyhľadávanie filmov
  searchMovies() {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query).then((movies) => {
        this.movies = movies;
      });
    } else {
      this.movies = [];
    }
  }

  // Nastavenie hodnotenia filmu
  setRating(movie: any, rating: number) {
    movie.rating = rating;  // Nastavenie hodnotenia pre konkrétny film
    this.rating = rating;   // Uložíme hodnotenie do premenné rating
  }

  // Metóda pre pridanie filmu do obľúbených
  addToFavorites(movie: any) {
    this.movieService.saveToFavorites(movie);
  }

  // Metóda pre označenie filmu ako pozretého
  markAsWatched(movie: any) {
    if (this.rating === null || this.rating < 1 || this.rating > 10) {
      alert('Prosím zadajte hodnotenie medzi 1 a 10.');
      return;  // Nepokračujte, ak hodnotenie nie je nastavené alebo je mimo rozsahu
    }

    // Posielame film s hodnotením do služby
    this.movieService.markAsWatched(movie, this.rating);  
    this.rating = null;  // Po pridaní filmu vymažeme hodnotenie
  }
}
