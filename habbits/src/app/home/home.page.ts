import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { PreviousDatePipe } from "./previous-date.pipe";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  habits = [];
  habitId;
  showRemoveButton = false;
  date;
  previousDatePipe = new PreviousDatePipe();
  datePipe = new DatePipe("en-US");

  counter = 0;

  constructor(
    public alertController: AlertController,
    private translate: TranslateService
  ) {
    translate.setDefaultLang(localStorage.getItem("habitsLanguare") || "en");
  }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("habitsLanguare", language);
  }

  ionViewDidEnter() {
    this.date = new Date();
    this.habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  checkLastDatesDone(index) {
    let habitShow = this.habits[index].show;

    this.habits[index].datesDone.forEach((dateDone) => {
      for (let i = 0; i < 5; i++) {
        if (
          this.datePipe.transform(dateDone, "shortDate") ==
          this.datePipe.transform(
            this.previousDatePipe.transform(this.date, i),
            "shortDate"
          )
        ) {
          habitShow[4 - i] = true;
        }
      }
    });
  }

  timeoutHandler;

  pressEvent(when: string, id: number) {
    if (when == "start") {
      this.timeoutHandler = setInterval(() => {
        this.counter++;
        if (this.counter > 4) {
          clearInterval(this.timeoutHandler);
          this.habitId = id;
          this.onAddHabit();
        }
      }, 100);
    } else if (when == "end") {
      clearInterval(this.timeoutHandler);
      this.counter = 0;
    }
  }

  onHabitCheck(daysAgo: number, id: number, isDone: boolean) {
    let habit = this.habits[id];

    if (isDone) {
      habit.show[daysAgo] = false;
      daysAgo = 4 - daysAgo;
      for (
        let i = habit.datesDone.length - 1;
        i >= habit.datesDone.length - 5;
        i--
      ) {
        if (
          this.datePipe.transform(habit.datesDone[i], "shortDate") ==
          this.datePipe.transform(
            this.previousDatePipe.transform(this.date, daysAgo),
            "shortDate"
          )
        ) {
          habit.datesDone.splice(i, 1);
        }
      }
    } else {
      daysAgo = 4 - daysAgo;
      let dateDone = new Date();
      dateDone.setDate(dateDone.getDate() - daysAgo);
      habit.datesDone.push(dateDone);
      this.checkLastDatesDone(id);
    }

    localStorage.setItem("habits", JSON.stringify(this.habits));
  }

  onRemoveHabit() {
    this.habits.splice(this.habitId, 1);
    console.log(this.habitId);
    localStorage.setItem("habits", JSON.stringify(this.habits));
    this.habitId = null;
  }

  // onEditHabit(id) {
  //   this.habitId = id;
  //   this.onAddHabit();
  // }

  async onAddHabit() {
    let currentHabit;
    let title;
    if (this.habitId == null) {
      title = this.translate.instant("home.insertTitle");
      currentHabit = {
        name: "",
        repeatTimes: "",
        timeframe: "",
      };
    } else {
      title = this.translate.instant("home.changeTitle");
      currentHabit = {
        name: this.habits[this.habitId].name,
        repeatTimes: this.habits[this.habitId].repeatTimes,
        timeframe: this.habits[this.habitId].timeframe,
      };
    }

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      inputs: [
        {
          name: "name",
          type: "text",
          cssClass: "nameInput alertInput",
          placeholder: this.translate.instant("home.habitName"),
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
          cssClass: "repeatInput alertInput",
          value: currentHabit.repeatTimes,
          //maxLength
        },
        {
          name: "timeframe",
          type: "number",
          cssClass: "timeframeInput alertInput",
          value: currentHabit.timeframe,
          //maxLength
        },
      ],
      buttons: [
        // {
        //   text: "Color",
        //   cssClass: "secondary",
        //   handler: () => {
        //     this.changeColorAlert();
        //   },
        // },
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
          cssClass: "confirm disabled",
          handler: (alertData) => {
            let newHabit = {
              name: alertData.name,
              repeatTimes: alertData.repeatTimes,
              timeframe: alertData.timeframe,
              done: false,
              datesDone: [],
            };
            // this.habits = JSON.parse(localStorage.getItem("habits")) || [];

            if (this.habitId == null) {
              newHabit["show"] = Array(5).fill(false);
              //newHabit["show"] = [false, false, false, false, false];
              // newHabit["show"] = Array.from({ length: 5 }).map((el) => false);
              this.habits.push(newHabit);
            } else {
              newHabit["show"] = this.habits[this.habitId].show;
              this.habits[this.habitId] = newHabit;
              this.habitId = null;
            }
            localStorage.setItem("habits", JSON.stringify(this.habits));
          },
        },
      ],
    });

    await alert.present();

    const confirmBtn = document.querySelector(".confirm") as HTMLButtonElement;

    if (this.habitId == null) {
      confirmBtn.disabled = true;
      confirmBtn.classList.add("disabled");
    } else {
      confirmBtn.disabled = false;
      confirmBtn.classList.remove("disabled");
    }

    const code$ = new Subject();
    const codeInput = document.getElementsByClassName(
      "alertInput"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const alertInputs = Array.from(codeInput);
    alertInputs.forEach((element) => {
      element.addEventListener("keyup", () => code$.next(alertInputs));
    });
    code$.asObservable().subscribe((alertInputs: HTMLInputElement[]) => {
      let buttonDisabled = false;
      confirmBtn.classList.remove("disabled");

      alertInputs.forEach((element) => {
        if (element.value == "") {
          buttonDisabled = true;
          confirmBtn.classList.add("disabled");
        }
      });
      confirmBtn.disabled = buttonDisabled;
    });

    // const confirmBtn = document.querySelector('.confirm') as HTMLButtonElement;
    // confirmBtn.disabled = true;

    // let codeOneDisabled;
    // let codeTwoDisabled;
    //   let codeThreeDisabled;
    // if (this.habitId == null) {
    //   codeOneDisabled = true;
    //   codeTwoDisabled = true;
    //   codeThreeDisabled = true;
    // } else {
    //   confirmBtn.disabled = false;
    // }

    // const code1$ = new Subject();
    // const codeInput1 = document.getElementById('code1') as HTMLInputElement;
    // codeInput1.addEventListener('keyup', () => code1$.next(codeInput1.value));
    // code1$.asObservable().subscribe(code => {
    //   codeOneDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });

    // const code2$ = new Subject();
    // const codeInput2 = document.getElementById('code2') as HTMLInputElement;
    // codeInput2.addEventListener('keyup', () => code2$.next(codeInput2.value));
    // code2$.asObservable().subscribe(code => {
    //   codeTwoDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });

    // const code3$ = new Subject();
    // const codeInput3 = document.getElementById('code3') as HTMLInputElement;
    // codeInput3.addEventListener('keyup', () => code3$.next(codeInput3.value));
    // code3$.asObservable().subscribe(code => {
    //   codeThreeDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });
  }

  async changeColorAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Radio",
      inputs: [
        {
          name: "radio1",
          type: "radio",
          label: "Radio 1",
          value: "value1",
          checked: true,
        },
        {
          name: "radio2",
          type: "radio",
          label: "Radio 2",
          value: "value2",
          cssClass: "radio2",
        },
      ],
      buttons: [
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }
}
