import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from "app/models/person";
import { PersonService } from '../services/person-service';
import { PersonTableComponent } from '../person-table/person-table.component';


@Component({
  selector: '[person-table-row]', // <-- o tutaj
  templateUrl: './person-table-row.component.html',
  styleUrls: ['./person-table-row.component.css']
})
export class PersonTableRowComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<number>();

  @Output() saveEvent = new EventEmitter<Person>();

  @Input() model:Person;
  emo:Person;

  isInEditMode : boolean = false;

  edit() {
    this.isInEditMode = true;
    this.emo = new Person(this.model.id, this.model.firstname,
      this.model.lastname, this.model.gender, this.model.age, this.model.birthday,
      this.model.income, this.model.email);
  }

  delete() {
    this.deleteEvent.emit(this.model.id);
    
  }  

  save() {
    this.saveEvent.emit(this.emo);
  }

  constructor( ) { }

  ngOnInit() {
  }
}
