import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-detail-view",
  templateUrl: "./detail-view.page.html",
  styleUrls: ["./detail-view.page.scss"],
})
export class DetailViewPage implements OnInit {
  habit;

  constructor(private route: ActivatedRoute, private translate: TranslateService) {

    translate.setDefaultLang(localStorage.getItem("habitsLanguare") || "en");
  }

  ngOnInit() {
    let habits = JSON.parse(localStorage.getItem("habits"));
    this.route.params.subscribe((param) => {
      this.habit = habits[param.id];
    });
  }

  data=[
    ['01/21/2020','1'],
    ['06/20/2020','2'],
    ['12/25/2020','3'],
    ['11/05/2020','3'],

  ]
}
