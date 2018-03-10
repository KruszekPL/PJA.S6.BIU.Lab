
function Person(json){
    var self = this;
    self.name  = json.firstName;
    self.surname = json.lastName;
    
    
    self.toTableRow = function(){
        return '<tr><td>'
            +self.name
            +'</td><td>'
            +self.surname
            +'</td></tr>'
    }
    
    self.fullName = function(){
        return sum(self.name, self.surname);
    }
    
    var sum = function(a,b){
        return a+ " "+b;
    }
    
}

function ListOfPeople(){
    var people =[];
    var self = this;
    self.addPerson = function(json){
        people.push(new Person(json));
    }
    
    self.toTable = function(){
        var table = '<table>';
        table += generateTableHeader();
        for(var i =0;i<people.length;i++){
            table+=people[i].toTableRow();
        }
        table+='</table>'
        return table;
    }
    
    var generateTableHeader= function(){
        return '<tr><th>Name</th> <th>Surname</th></tr>'
    }
}

function init(){
    var listOfPeople = new ListOfPeople();
    for(var i =0;i<data.length;i++){
            listOfPeople.addPerson(data[i]);
        }
    var context = document.getElementById('table');
    context.innerHTML = listOfPeople.toTable();
}

var person = new  Person();




















