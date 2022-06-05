import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { db } from './movies.db';
import { Movie } from './movies.model';
import { map , switchMap } from 'rxjs/operators';

@Injectable()
export class MovieService {

  movies: Movie[] = db['movies'];

  subject = new BehaviorSubject<Movie[]>(this.movies);

  movies$: Observable<Movie[]> = this.subject.asObservable();

  genres$: Observable<string[]> = of(db['genres']);


  getMovie(id: number): Observable<Movie | undefined> {
    return this.movies$.pipe(
      map(movies => movies.find(movie => movie.id === id))
    );
  }


  filterByGenre(genre: string) {
    return of(this.movies).pipe(
      map(movies => movies.filter(movie => movie.genres.includes(genre))),
      map(movies => this.subject.next(movies))
    ).subscribe();
  }



  searchMovieByTitle(title: string) {
    return of(this.movies).pipe(
      map(movies => movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))),
      map(movies => this.subject.next(movies))
    )
  }








  constructor() { }
}
