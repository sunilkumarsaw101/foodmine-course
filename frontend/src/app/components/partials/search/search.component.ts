import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 searchTerm='';
  constructor(private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param)=>{
      console.log(param);
      if(param.searchTerm){
        console.log(param.searchTerm);
        this.searchTerm= param.searchTerm;
      }
    })
  }

  search(term: string){
    if(term){
      this.route.navigateByUrl(`/search/${term}`);
    }
  }

}
