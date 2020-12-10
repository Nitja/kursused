import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  notesFromDatabase = [];

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(
      "https://notes-d2e35-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
    );
  }

  synchronizeNotes(notes: any[]) {
    this.http.put(
      "https://notes-d2e35-default-rtdb.europe-west1.firebasedatabase.app/notes.json",
      notes
    ).subscribe();
  }
}
