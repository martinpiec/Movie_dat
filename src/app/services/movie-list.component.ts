import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];  // Premenná na uloženie filmov z API
  query: string = '';   // Vyhľadávací dopyt používateľa

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  // Metóda na vyhľadávanie filmov
  searchMovies() {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query).then((movies: any[]) => {
        this.movies = movies;
      });
    }
  }

  // Metóda na pridanie filmu do obľúbených
  addToFavorites(movie: any) {
    this.movieService.saveToFavorites(movie);
  }
}
