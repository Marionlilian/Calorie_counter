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
    this.intake = this.loadIntake();
    this.form = document.getElementById('inputForm');
    this.caloriesList = document.getElementById('caloriesList');
    this.totalElement = document.getElementById('total');

    this.initEventListeners();
    this.renderIntakes();
    this.updateTotal();

}

loadIntake(){
    console.log(intake);
    return JSON.parse(localStorage.getItem ('intake')|| []);
}
initEventListeners() {
  this.form.addEventListener('submit', e => {
    e.preventDefault();
    this.addTransaction();
  });
}

addIntake(){
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
    this.intake.push(intake);
    this.saveIntake();
    this.renderIntake();
    this.updateTotal();
    this.clearForm();
};
clearForm(){
    document.getElementById('description').value= ''
    document.getElementById('amount').value =''
}
saveIntake(){
    localStorage.setItem('intake'.JSON.stringify (this.intake));

}

renderIntakes(){
    this.display= document.getElementById('display');
    this.display.innerHTML="";
    this.input
    .slice()
    .sort ((a,b)=>b.id -a.id)
    .forEach((input)=>
{
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input');
    inputDiv.innerHtml = ` 
          <span>${input.description}</span>
          <span>${Math.abs(input.amount).toFixed(2)}</span>
          <button class="deletebtn" data-id = ${input.id}>Delete</button>`;

          this.intakeList.appendChild('inputDiv');
})
this.attachDeleteEventListeners();
};



attachDeleteEventListeners(){
    this.intakeList.querySelectorAll('.deletebtn').forEach(button=>{
        button.addEventListener('click', ()=>{
            this.deleteIntake(Number(button.dataset.id));
        })
    })
}
deleteCalories(){
    this.intake = this.intake.filter(input => input.id !== id);

    this.saveIntake();
    this.renderIntakes();
    this.updateTotal();
}
updateTotal(){
    let total = 0;
    this.intake.forEach(tr=>{
        total+=tr.amount;
    });
    this.totalElement.textContent= `Total Calories: ${(total.toFixed(2))}`;

};

}
const caloriesCounter =new CaloriesCounter();
