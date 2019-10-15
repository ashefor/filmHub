import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  movieId: string;
  constructor(private movieservice: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((data: Params)=>{
      this.movieId = data['id']

      this.movieservice.getSingleMovie(this.movieId).subscribe((data)=>{
        console.log(data)
      })
    })
  }

}
