import { PersonListItem } from "./person-list-item";

export class PersonList {

    private _people : Array<PersonListItem> = [];
    public get people() : Array<PersonListItem> {
        return this._people;
    }
    public set people(v : Array<PersonListItem>) {
        this._people = v;
    }

    public toTable() : string {
        var table = '<table class="table table-striped table-hover table-bordered">';
        table += this.generateTableHeader();
        table += '<tbody>';
        this._people.forEach(person => table += person.toTableRow());
        table += '</tbody></table>'
        return table;
    }

    public clear() {
        this._people = [];
    }

    private generateTableHeader() : string {
        return '<tr>'
        + '<th><button class="btn btn-sm btn-danger js-sort-id">Id</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-name">Name</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-surname">Surname</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-gender">Gender</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-email">E-mail</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-age">Age</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-birthsday">Birthsday</button></th>'
        + '<th><button class="btn btn-sm btn-danger js-sort-income">Income</button></th>'
        + '</tr>'
    }
}