import { people } from './data'; //-> import danych o osobach
import { PersonListItem } from "../person-list-item"; //-> import klasy

export class PagingInfo {
    constructor(public page : number, public count : number) {
    }
}

export class PersonService {

    public getPeople(pagingInfo : PagingInfo) : Array<PersonListItem> {
        let begin = pagingInfo.page - 1;
        if (begin < 0) {
            begin = 0;
        }
        return people
        .slice(begin * pagingInfo.count,
        begin * pagingInfo.count + pagingInfo.count)
        //-> z zaimportowanej kolekcji wybieramy stronę wyników
        .map(x => {
            let person = new PersonListItem();
            person.firstName = x.firstName;
            person.lastName = x.lastName;
            person.gender = x.gender;
            person.email = x.email;
            person.income = +x.income;
            person.age = x.age;
            person.birthsday = new Date(x.birthsday);
            person.id = x.id;
            return person;
        });
        //-> pobrane wyniki mapujemy na obiekty PersonListItem
    }

    public sortById() {
        people
        .sort((left, right) : number => {
            if (left.id < right.id) return -1;
            if (left.id > right.id) return 1;
            return 0;
        });
        console.log("Sortujemy po Id");        
    }

    public sortByfirstName() {
        people
        .sort((left, right) : number => {
            if (left.firstName < right.firstName) return -1;
            if (left.firstName > right.firstName) return 1;
            return 0;
        });
        console.log("Sortujemy po Imieniu");
    }

    public sortBylastName() {
        people
        .sort((left, right) : number => {
            if (left.lastName < right.lastName) return -1;
            if (left.lastName > right.lastName) return 1;
            return 0;
        });
        console.log("Sortujemy po Nazwisku");
    }

    public sortByGender() {
        people
        .sort((left, right) : number => {
            if (left.gender < right.gender) return -1;
            if (left.gender > right.gender) return 1;
            return 0;
        });
        console.log("Sortujemy po Płci");
    }

    public sortByEmail() {
        people
        .sort((left, right) : number => {
            if (left.email < right.email) return -1;
            if (left.email > right.email) return 1;
            return 0;
        });
        console.log("Sortujemy po adresie E-mail");
    }

    public sortByAge() {
        people
        .sort((left, right) : number => {
            if (left.age < right.age) return -1;
            if (left.age > right.age) return 1;
            return 0;
        });
        console.log("Sortujemy po Wieku");
    }

    public sortByBirthsday() {
        people
        .sort((left, right) : number => {
            if (left.birthsday < right.birthsday) return -1;
            if (left.birthsday > right.birthsday) return 1;
            return 0;
        });
        console.log("Sortujemy po dacie urodzin");
    }

    public sortByIncome() {
        people
        .sort((left, right) : number => {
            if (left.income < right.income) return -1;
            if (left.income > right.income) return 1;
            return 0;
        });
        console.log("Sortujemy po Dochodzie");
    }

}

var service = new PersonService();

console.log(service.getPeople(new PagingInfo(1, 5)));