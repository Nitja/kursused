import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-koera-vaade',
  templateUrl: './koera-vaade.page.html',
  styleUrls: ['./koera-vaade.page.scss'],
})
export class KoeraVaadePage implements OnInit {

  constructor() { }


  dog;
  id;
  activatedRoute: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    let dogs = localStorage.getItem("dogs");

    this.dog = dogs[this.id];
  }
}
