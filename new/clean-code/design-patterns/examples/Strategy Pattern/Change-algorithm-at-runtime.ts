interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paying $${amount} with Credit Card...`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paying $${amount} with PayPal...`);
  }
}

class PaymentProcessor {
  private strategy: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  processPayment(amount: number) {
    this.strategy.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor();
const creditCardPayment = new CreditCardPayment();
const payPalPayment = new PayPalPayment();

paymentProcessor.setPaymentStrategy(creditCardPayment);
paymentProcessor.processPayment(100); // Output: 'Paying $100 with Credit Card...'

paymentProcessor.setPaymentStrategy(payPalPayment);
paymentProcessor.processPayment(50); // Output: 'Paying $50 with PayPal...'
