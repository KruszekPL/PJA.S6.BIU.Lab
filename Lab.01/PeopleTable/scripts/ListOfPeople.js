function ListOfPeople(){
    var people =[];
    var self = this;

    self.clear = function() {
        people = [];
    }

    self.addPerson = function(json){
        people.push(new Person(json));
    }
    
    self.toTable = function(){
        var table = '<table>';
        table += generateTableHeader();
        for(var i =0; i < people.length; i++){
            table += people[i].toTableRow();
        }
        table += '</table>'
        return table;
    }
    
    var generateTableHeader = function(){
        return '<tr>'
        + '<th><button onclick = "viewModel.sort(comparator.byId)">Id</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byFirstName)">Name</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byLastName)">Surname</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byGender)">Gender</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byEmail)">Email</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byAge)">Age</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byBirthsday)">Birthsday</button></th>'
        + '<th><button onclick = "viewModel.sort(comparator.byIncome)">Income</button></th>'
        + '</tr>'
    }
}