import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  // enteredAnnualInvestment = signal('');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  // Computed signal for the annual investment
  enteredAnnualInvestment = computed(() => {
    return (parseFloat(this.enteredInitialInvestment()) * 12).toString();
  });

  constructor(private investmentService: InvestmentService) { }

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    });

    // this.enteredInitialInvestment.set('0');
    // // this.enteredAnnualInvestment.set('0');
    // this.enteredExpectedReturn.set('5');
    // this.enteredDuration.set('10');
  }

  clear(){
    this.enteredInitialInvestment.set('0');
    // this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }

  isSuccess: boolean = false;

  onButtonClick() {
    this.isSuccess = !this.isSuccess; // Toggle between cross and tick

    this.enteredInitialInvestment.set('0');
    // this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
    console.log(this.isSuccess ? 'Success!' : 'Reset!');
    // Reset to the original state after 2 seconds
    setTimeout(() => {
      this.isSuccess = false; // Change back to cross icon and red color
    }, 2000);
  }
}
