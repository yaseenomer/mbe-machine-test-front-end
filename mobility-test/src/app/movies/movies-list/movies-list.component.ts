import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '../movies.model';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
/**
 * @name search - search input
 */
  search = new FormControl('');

  /**
   * @name sub - subscription to search input
   */
  sub = Subscription.EMPTY;

  /**
   * @name Movies - list of movies
   */
  movies$: Observable<Movie[]> = this.movieService.movies$;


  /**
   * @name  genres - list of genres
   */
  genres$: Observable<string[]> = this.movieService.genres$;


  constructor(private movieService: MovieService) {}

  /**
   *  @name filterByGenre - filter movies by genre
   * @param e - event from search input
   */
  filterByGenre(e: any) {
    this.movieService.filterByGenre(e.target.value);
  }


  /**
   *
   * @name ngOnInit - subscribe to search input and filter movies by title
   */
  ngOnInit(): void {
    this.sub = this.search.valueChanges
      .pipe(
        startWith(''),
        switchMap((value) => this.movieService.searchMovieByTitle(value))
      )
      .subscribe();
  }

  /**
   * @name ngOnDestroy - unsubscribe from search input
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
