import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  favorites: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    // Odberáme obľúbené filmy a aktualizujeme zoznam pri každej zmene
    this.movieService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(movie: any) {
    this.movieService.removeFromFavorites(movie);  // Odstránime film a aktualizujeme zoznam
  }
}
