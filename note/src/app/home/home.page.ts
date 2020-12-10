import { getLocaleDayNames } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  notes: any[];
  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  constructor() {}

  ionViewDidEnter(): void {
  
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];

    this.getShownDate();
    this.sortItems();
  }

  getShownDate() {
    let dateToday = new Date();
    let todayDay = dateToday.getDate();
    let todayMonth = dateToday.getMonth() + 1;
    let todayYear = dateToday.getFullYear();

    let yesterday = new Date();
    yesterday.setDate(dateToday.getDate() - 1);

    let lastWeek = new Date();
    lastWeek.setDate(dateToday.getDate() - 6);

    let i = 0;
    this.notes.forEach((note) => {
      note.id = i;
      i++;

      if (note.date) {
        let noteDate = new Date(note.date);
        let noteDay = noteDate.getDate();
        let noteMonth = noteDate.getMonth() + 1;
        let noteYear = noteDate.getFullYear();

        if (
          todayDay == noteDay &&
          todayMonth == noteMonth &&
          todayYear == noteYear
        ) {
          let minutes;
          if (noteDate.getMinutes() < 10) {
            minutes = "0" + noteDate.getMinutes();
          } else if ((noteDate.getMinutes() == 0)) {
            minutes = "00";
          } else {
            minutes = noteDate.getMinutes();
          }
          note.dateShown = noteDate.getHours() + ":" + minutes;
        } else if (
          yesterday.getDate() == noteDay &&
          yesterday.getMonth() + 1 == noteMonth &&
          yesterday.getFullYear() == noteYear
        ) {
          note.dateShown = "Yesterday";
        } else if (noteDate > lastWeek) {
          note.dateShown = this.weekdays[noteDate.getDay()];
        } else {
          note.dateShown = noteDay + "." + noteMonth + "." + noteYear;
        }
      }
    });
  }

  sortItems() {
    this.notes = this.notes.sort((firstNote, secondNote) => {
      let firstDate = new Date(firstNote.date);
      let secondDate = new Date(secondNote.date);
      return secondDate.getTime() - firstDate.getTime();
    });
  }
}
