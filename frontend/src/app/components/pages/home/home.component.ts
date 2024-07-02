import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
   foodObservable: Observable<Food[]>;
  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    // console.log(this.activatedRoute.params);
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params);
      if (params.searchTerm) {
        this.foodObservable = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm
        );
      } else if (params.tag) {
        console.log(params.tag);
        this.foodObservable = this.foodService.getAllFoodsByTag(params.tag);
        console.log(this.foods);
      } else {
        this.foodObservable = this.foodService.getAll();
      }
      
      this.foodObservable.subscribe((serverFoods)=>{
        this.foods= serverFoods;
      })

    });
  }
}
