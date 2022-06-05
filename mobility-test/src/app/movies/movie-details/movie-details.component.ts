import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '../movies.model';

@Component({
  selector: 'app-movie-details',
  template: `
    <div class="row  my-5">
      <div class="col-4">
        <input
          class="form-control me-2 rounded-pill"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </div>

    <div *ngIf="movie$ | async as movie; else notFound">
      <div class="row">
        <div class="col-4">
          <img
            [src]="movie?.posterUrl"
            alt="{{ movie?.title }}"
            onerror="this.src='https://via.placeholder.com/300x450'"
            class="img-fluid"
          />
        </div>
        <div class="col-8">
          <h1>{{ movie?.title }}</h1>
          <p>{{ movie?.year }}</p>
          <p>{{ movie?.actors }}</p>
          <br />
          <p>{{ movie?.plot }}</p>

        </div>
      </div>
    </div>

    <!--  in movie not found will shwo this template  -->
    <ng-template #notFound>
      <p>Not Found 🥺</p>
    </ng-template>
  `,
  styles: [],
})
export class MovieDetailsComponent {
  /**
   * @name id - id of movie
   */
  id: any;

  /**
   * @name movie$ - movie observable
   */
  movie$: Observable<Movie | undefined>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.movie$ = this.movieService.getMovie(+this.id);
  }

}
