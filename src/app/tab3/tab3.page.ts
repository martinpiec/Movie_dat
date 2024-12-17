import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  sortBy: string = 'date';  // Predvolená hodnota 'date'
  watchedMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    // Subskripcia na zmenu zoznamu pozretých filmov
    this.movieService.watchedMovies$.subscribe((movies) => {
      this.watchedMovies = movies;
    });
  }

  // Funkcia na zmenu poradia (na základe vybranej hodnoty)
  changeSortOrder(sortValue: string) {
    this.movieService.sortWatchedMovies(sortValue);
  }

  // Funkcia na odstránenie filmu zo zoznamu pozretých filmov
  removeWatchedMovie(movie: any) {
    this.movieService.removeWatchedMovie(movie);  // Zavoláme metódu na vymazanie filmu
  }
}
