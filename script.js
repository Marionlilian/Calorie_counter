class CaloriesCounter {
  constructor() {
    this.intake = this.loadIntake();
    this.form = document.getElementById('input');
    this.caloriesList = document.getElementById('caloriesList');
    this.totalElement = document.getElementById('total');

    this.initEventListeners();
    this.renderIntakes();
    this.updateTotal();
  }

  loadIntake() {
    return JSON.parse(localStorage.getItem('intake')) || [];
  }

  saveIntake() {
    localStorage.setItem('intake', JSON.stringify(this.intake));
  }

  initEventListeners() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.addIntake();
    });
  }

  
  async fetchCalories(query) {
    const API_KEY = "ACwJINxO/M4xbUg138A+7A==vVedM4kxvHTFunJT"; 

    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY
      }
    });

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return null;
    }

    const data = await response.json();
    console.log(data);

    if (data.items && data.items.length > 0) {
      const food = data.items[0];
      return {
        description: food.name,
        amount: food.calories
      };
    }

    return null;
  }

  async addIntake() {
    const description = document.getElementById('description').value.trim();

    if (!description) {
      alert("Please enter a food name.");
      return;
    }

    const foodData = await this.fetchCalories(description);

    if (!foodData) {
      alert("Could not fetch calories. Try again.");
      return;
    }

    const intake = {
      id: Date.now(),
      description: foodData.description,
      amount: foodData.amount
    };

    this.intake.push(intake);
    this.saveIntake();
    this.renderIntakes();
    this.updateTotal();
    this.clearForm();
  }

  clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
  }

  renderIntakes() {
    this.caloriesList.innerHTML = "<h2>Consumed Calories</h2>"; 
    this.intake
      .slice()
      .sort((a, b) => b.id - a.id)
      .forEach(item => {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('transaction');
        inputDiv.innerHTML = `
          <span>${item.description}</span>
          <span>${item.amount}</span>
          <button class="deletebtn" data-id="${item.id}">Delete</button>
        `;
        this.caloriesList.appendChild(inputDiv);
      });

    this.attachDeleteEventListeners();
  }

  attachDeleteEventListeners() {
    this.caloriesList.querySelectorAll('.deletebtn').forEach(button => {
      button.addEventListener('click', () => {
        this.deleteIntake(Number(button.dataset.id));
      });
    });
  }

  deleteIntake(id) {
    this.intake = this.intake.filter(item => item.id !== id);
    this.saveIntake();
    this.renderIntakes();
    this.updateTotal();
  }

  updateTotal() {
    let total = 0;
    this.intake.forEach(tr => {
      total += tr.amount;
    });
    this.totalElement.textContent = `Total Calories: ${total.toFixed(2)}`;
  }
}

const caloriesCounter = new CaloriesCounter();
