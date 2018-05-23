import { Component, OnInit } from '@angular/core';
import { Person } from "app/models/person";
import { Filter } from "app/models/filter";
import { PersonService, PagingInfo } from "app/services/person-service";
import { PersonTableRowComponent } from '../person-table-row/person-table-row.component';

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  items: Person[] = [];
  filter: Filter = new Filter();

  private nameAsc: boolean = true

  public sortByName() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.firstname.localeCompare(y.firstname));
    else
      this.items.sort((x, y) => -x.firstname.localeCompare(y.firstname));
    this.nameAsc = !this.nameAsc;
  }

  public sortByLastName() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.lastname.localeCompare(y.lastname));
    else
      this.items.sort((x, y) => -x.lastname.localeCompare(y.lastname));
    this.nameAsc = !this.nameAsc;
  }

  public sortByAge() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.age - (y.age));
    else
      this.items.sort((x, y) => y.age - (x.age));
    this.nameAsc = !this.nameAsc;
  }

  public sortByGender() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.gender.localeCompare(y.gender));
    else
      this.items.sort((x, y) => -x.gender.localeCompare(y.gender));
    this.nameAsc = !this.nameAsc;
  }

  public sortByEmail() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.email.localeCompare(y.email));
    else
      this.items.sort((x, y) => -x.email.localeCompare(y.email));
    this.nameAsc = !this.nameAsc;
  }

  public sortByBirthday() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.birthday.getTime() - y.birthday.getTime());
    else
      this.items.sort((x, y) => y.birthday.getTime() - x.birthday.getTime());
    this.nameAsc = !this.nameAsc;
  }
  
  public sortByIncome() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.income - (y.income));
    else
      this.items.sort((x, y) => y.income - (x.income));
    this.nameAsc = !this.nameAsc;
  }

  private currentPage = 1;
  
  public next() {
    this.items = [];
    this.currentPage++;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10), this.filter);
  }

  public prev(): void {
    if (this.currentPage <= 1) return;
    this.items = [];
    this.currentPage--;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10), this.filter);
  }

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.items = this.personService.getPeople(new PagingInfo(1, 10), this.filter);
  }

  public refresh(): void {
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10), this.filter);

  }

  delete(id:number) {
    this.personService.delete(id);
    this.refresh();
  }

  save(person:Person) {
    this.personService.save(person);
    this.refresh();
  }
}