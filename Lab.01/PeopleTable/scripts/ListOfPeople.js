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