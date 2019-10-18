import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchParam: string;
  searchResults: [];
  loading: boolean = true;
  subscription: Subscription
  constructor(private route: ActivatedRoute, private movieservice: MoviesService) { }

  ngOnInit() {
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.route.queryParams.subscribe((data:Params)=>{
      this.searchParam = data['s']
      console.log(this.searchParam)
       this.subscription = this.movieservice.searchForMovie(this.searchParam ).subscribe((data:any)=>{
        if(data){
          this.loading = false;
          console.log(data)
          if(data.Response === 'True'){
            this.searchResults = data.Search
            console.log(this.searchResults)
          }
        }
    })
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
