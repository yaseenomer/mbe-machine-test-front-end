import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieService } from './movie.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: ':id', component: MovieDetailsComponent }
];



@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   ReactiveFormsModule,
  ],
  providers: [MovieService],
})
export class MoviesModule { }
