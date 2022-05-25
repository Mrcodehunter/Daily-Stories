class User{
    // BkashPayment bkashPayment=new BkashPayment();
    // CardPayment cardPayment=new CardPayment();
    IPaymentMethod _paymentMethod;
    User(IPaymentMethod paymentMethod){
        _paymentMethod=paymentMethod;
    }
    MakePayment(){

        // bkashPayment.pay();
        _paymentMethod.pay();
    }
}

interface  IPaymentMethod
{
   public void pay();
}

class BkashPayment:IPaymentMethod{
    void pay(){
        Console.WriteLine("Bkash payment made");
    }
}

class CardPayment:IPaymentMethod{
    void pay(){
        Console.WriteLine("Card payment made");
    }
}

var bkashPayment=new BkashPayment();
var cardPayment=new CardPayment();
User user=new User(cardPayment);
user.MakePayment();