import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  habits = [];
  habitId;

  constructor(public alertController: AlertController) {}

  ionViewDidEnter() {
    this.habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  onEditHabit(id) {
    this.habitId = id;
    this.onAddHabit();
   // this.habitId = null;
  }

  async onAddHabit() {
    let currentHabit;
    if (this.habitId == null) {
      currentHabit = {
        name: "",
        repeatTimes: "",
        timeframe: "",
      };
    } else {
      currentHabit = {
        name: this.habits[this.habitId].name,
        repeatTimes: this.habits[this.habitId].repeatTimes,
        timeframe: this.habits[this.habitId].timeframe,
      };
    }

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Insert new habit",
      inputs: [
        {
          name: "name",
          type: "text",
          cssClass: "nameInput",
          placeholder: "Name of habit",
          value: currentHabit.name,
        },
        {
          name: "repeatText",
          type: "textarea",
          value: "Repeat ___ times per ___ days",
          cssClass: "repeatText",
          attributes: {
            readOnly: true,
          },
        },
        {
          name: "repeatTimes",
          type: "number",
          cssClass: "repeatInput",
          value: currentHabit.repeatTimes,
          //maxLength
        },
        {
          name: "timeframe",
          type: "number",
          cssClass: "timeframeInput",
          value: currentHabit.timeframe,
          //maxLength
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.habitId = null;
          },
        },
        {
          text: "Ok",
          handler: (alertData) => {
            let newHabit = {
              name: alertData.name,
              repeatTimes: alertData.repeatTimes,
              timeframe: alertData.timeframe,
              done: false,
              datesDone: [],
            };
            this.habits = JSON.parse(localStorage.getItem("habits")) || [];
            
            console.log(this.habitId);
            
            if (this.habitId == null) {
              this.habits.push(newHabit);
            } else {
              this.habits[this.habitId] = newHabit;
              this.habitId = null;
            }
            localStorage.setItem("habits", JSON.stringify(this.habits));
          },
        },
      ],
    });

    await alert.present();
  }
}
