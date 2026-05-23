pin = int(input("Enter your 4-digit PIN: "))
balance = 10000
withdrawal_amount = int(input("Enter amount to withdraw: "))    


if pin == 1234:
    print("PIN accepted.")
    if balance >= withdrawal_amount:
        balance -= withdrawal_amount
        print(f"Withdrawal of Rs. {withdrawal_amount} successful.")
        print(f"Updated balance: Rs. {balance}")
    else:
        print("Insufficient balance for this withdrawal.")

else:
    print("Invalid PIN. Access denied.")
