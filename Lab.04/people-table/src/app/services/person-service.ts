
import { people } from './data'; //-> import danych o osobach
import { Person } from "app/models/person";
import { Filter } from '../models/filter';
import { Conditional } from '@angular/compiler';
import { filterQueryId } from '@angular/core/src/view/util';

export class PagingInfo {
    constructor(public page: number, public count: number) {
    }
}

export class PersonService {

    p = people
    
    public getPeople(pagingInfo: PagingInfo, filter: Filter): Array<Person> {

        let begin = pagingInfo.page - 1;
        if (begin < 0) begin = 0;

        return this.p
            .filter(p => {
                return p.firstName.toLowerCase().match(filter.firstname.toLowerCase() + ".*")
                    && p.lastName.toLowerCase().match(filter.lastname.toLowerCase() + ".*")
                    && p.email.toLowerCase().match(filter.email.toLowerCase() + ".*")
                    && ((filter.genderFemale==false? p.gender == "Male" : p.gender == "Female")
                    || (filter.genderMale==false? p.gender == "Female" : p.gender == "Male"))
                    && p.age >= filter.ageFrom
                    && p.age <= filter.ageTo
                    && new Date(p.birthsday).getTime() >= new Date(filter.birthdayFrom).getTime()
                    && new Date(p.birthsday).getTime() <= new Date(filter.birthdayTo).getTime()
                    && +p.income >= filter.incomeFrom
                    && +p.income <= filter.incomeTo
            })
            .slice(begin * pagingInfo.count,
                    begin * pagingInfo.count + pagingInfo.count)
            .map(x =>  new Person(
                    x.id,
                    x.firstName,
                    x.lastName,
                    x.gender,
                    x.age,
                    new Date(x.birthsday),
                    +x.income,
                    x.email
                )
            );
    }

    public delete(id:number) {
        this.p = people.filter(d => {
            return d.id != id;
        })
    }

    public save(person:Person) {
        let found = this.p.find(s => {
            return s.id == person.id;
        });
        found.firstName = person.firstname;
        found.lastName = person.lastname;
        found.age = person.age;
        found.email = person.email;
        found.gender = person.gender;
        found.birthsday = new Date(person.birthday).toDateString();
        found.income = person.income + "";
        
    }

}

var service = new PersonService();