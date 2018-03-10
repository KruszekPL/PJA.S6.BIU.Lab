function Person(json){
    var self = this;
    self.id = json.id;
    self.gender = json.gender;
    self.firstName  = json.firstName;
    self.lastName = json.lastName;
    self.email = json.email;
    self.income = json.income;
    self.birthsday = json.birthsday;
    self.age = json.age;

    self.toTableRow = function(){
        return '<tr><td>'
            +self.id
            +'</td><td>'            
            +self.firstName
            +'</td><td>'
            +self.lastName
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
        return sum(self.firstName, self.lastName);
    }
    
    var sum = function(a, b){
        return a + " " + b;
    }   
}