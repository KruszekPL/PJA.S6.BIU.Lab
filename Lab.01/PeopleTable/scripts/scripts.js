
function Person(json){
    var self = this;
    self.id = json.id;
    self.gender = json.gender;
    self.name  = json.firstName;
    self.surname = json.lastName;
    self.email = json.email;
    self.income = json.income;
    self.birthsday = json.birthsday;
    self.age = json.age;

    self.toTableRow = function(){
        return '<tr><td>'
            +self.id
            +'</td><td>'            
            +self.name
            +'</td><td>'
            +self.surname
            +'</td><td>'
            +self.gender
            +'</td><td>'
            +self.email
            +'</td><td>'
            +self.age
            +'</td><td>'
            +self.birthsday
            +'</td><td>'
            +self.income                                                            
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
        return '<tr><th>Id</th><th>Name</th><th>Surname</th><th>Gender</th><th>Email</th><th>Age</th><th>Birthsday</th><th>Income</th></tr>'
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