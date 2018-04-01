import { PersonTable } from "./person-table";

const advancedSearch = $('.js-adv-search');
const advancedSearchButton = $('.js-adv-search-btn');
const peopleTable = $('div#table');
const tableNext = $('#js-button-next');
const tablePrev = $('#js-button-prev');
const table10 = $('#js-button-10');
const table25 = $('#js-button-25');
const table50 = $('#js-button-50');
const table100 = $('#js-button-100');

class Startup {

    public static main() : void {

        advancedSearch.hide();
        advancedSearchButton.click((event) => Startup.onAdvancedSearchClicked(event));
        let table = new PersonTable(peopleTable);
        table.next();
        tableNext.click(() => table.next());
        tablePrev.click(() => table.prev());
        table10.click(() => table.changeResults(10));
        table25.click(() => table.changeResults(25));
        table50.click(() => table.changeResults(50));
        table100.click(() => table.changeResults(100));
        $(document).on('click','.js-sort-id', function() {table.changeSorting("id");});
        $(document).on('click','.js-sort-name', function() {table.changeSorting("firstName");});
        $(document).on('click','.js-sort-surname', function() {table.changeSorting("lastName");});
        $(document).on('click','.js-sort-gender', function() {table.changeSorting("gender");});
        $(document).on('click','.js-sort-email', function() {table.changeSorting("email");});
        $(document).on('click','.js-sort-age', function() {table.changeSorting("age");});
        $(document).on('click','.js-sort-birthsday', function() {table.changeSorting("birthsday");});
        $(document).on('click','.js-sort-income', function() {table.changeSorting("income");});        
    }

    private static onAdvancedSearchClicked(event : JQueryEventObject) {
        event.preventDefault();
        // -> powoduje, że strona nie będzie się przeładowywać
        if (advancedSearch.is(':visible')) {
            advancedSearch.fadeOut(1000);
        } else {
            advancedSearch.fadeIn(1000);
        }
    }
}

$(Startup.main);