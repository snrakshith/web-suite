interface INotification {
  send(): void;
}

class EmailNotification implements INotification {
  send() {
    console.log("Sending email notification...");
  }
}

class SMSNotification implements INotification {
  send() {
    console.log("Sending SMS notification...");
  }
}

class NotificationFactory {
  createNotification(type: string): INotification | any {
    if (type === "email") {
      return new EmailNotification();
    } else if (type === "sms") {
      return new SMSNotification();
    }
  }
}

const factory = new NotificationFactory();
const emailNotification = factory.createNotification("email");
emailNotification.send();
