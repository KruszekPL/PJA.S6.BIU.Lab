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