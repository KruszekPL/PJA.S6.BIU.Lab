import { PersonList } from "./person-list";
import { PersonService, PagingInfo } from "./services/person-service";
import { people } from "./services/data";

export class PersonTable {

    constructor(public context : JQuery) {
    }

    personService = new PersonService();
    list = new PersonList();
    currentPage = 0;
    pageSize = 10;

    public next() {
        this.list.clear();
        this.currentPage++;
        this.list.people = this.personService.getPeople(new PagingInfo(this.currentPage, this.pageSize));
        this.refreshTable();
        console.log("Next");
    }

    public prev() : void {
        this.list.clear();
        if (this.currentPage <= 1) {
            return ;
        }
        this.currentPage--;
        this.list.people = this.personService.getPeople(new PagingInfo(this.currentPage, this.pageSize));
        this.refreshTable();        
        console.log("Prev");
    }

    public changeSorting(sortedBy : String) {
        this.currentPage = 1;
        this.list.clear();
        switch (sortedBy) {
            case "id":
                this.personService.sortById();
                break;
            case "firstName":
                this.personService.sortByfirstName();
                break;
            case "lastName":
                this.personService.sortBylastName();
                break;
            case "gender":
                this.personService.sortByGender();
                break;
            case "email":
                this.personService.sortByEmail();
                break;
            case "age":
                this.personService.sortByAge();
                break;
            case "birthsday":
                this.personService.sortByBirthsday();
                break;
            case "income":
                this.personService.sortByIncome();
                break;
            default:
            this.personService.sortById();
            break;
        }
        this.list.people = this.personService.getPeople(new PagingInfo(this.currentPage, this.pageSize));
        this.refreshTable();
    }

    public changeResults(amount : number) {
        this.currentPage--;
        this.currentPage = ((this.currentPage * this.pageSize) / amount);
        this.pageSize = amount;
        this.next();
        console.log("Zmiana ilości wyników: " + amount);
    }

    private refreshTable() {
        this.context.html(this.list.toTable());
    }
}