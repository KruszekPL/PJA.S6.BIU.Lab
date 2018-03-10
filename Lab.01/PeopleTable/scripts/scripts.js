function init(){
    viewModel.next();
}

var viewModel = new PeopleTableViewModel({
    pageSize : 25,
    count : data.length,
    context : document.getElementById('table')
});