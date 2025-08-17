const intake=[
    {
        id:Date.now(),
        description:'Banana',
        amount:300
        
    },
    {
        id:Date.now(),
        description:'Banana',
        amount:300
        
    }
]
class CaloriesCounter{
constructor(){
this.inputForm = document.getElementById('input-form');
this.input = document.getElementById('input');
this.logbtn = document.getElementById('submitbtn');
this. display = document.getElementById('display');
this.total = document.getElementById('total');
this.deletebtn = document.getElementById('deletebtn');

this.initEventListeners();
this.renderCalories();
this.updateTotal();

}

loadIntake(){
const description = document.getElementById('description').value.trim();
const amount = parseFloat(document.getElementById('amount').value);

    if (!/^[A-Za-z\s]+$/.test(description)) {
        alert('Description can only contain letters and spaces.');
        return;
    }
    if(!description || isNaN(amount)){
        alert('Please provide a valid description and amount');
        return;
    }
    const intake = {
        id:Date.now(),
        description,
        amount
    }
    this.saveIntake();
    this.renderIntake();
    this.clearForm();
};
saveIntake(){

}
addIntake(){

}
clearForm(){

}
renderIntake(){

}
updateTotal(){

};

deleteCalories(){

};



}
const caloriesCounter =new CaloriesCounter();
