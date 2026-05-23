Purchase_amount=float(input("Enter the purchase amount: "))

if Purchase_amount>=5000:
    Discount=Purchase_amount*0.2

    Final_amount=Purchase_amount-Discount

    print(f"Your Discount is: {Discount} Rs")
    print(f"Your Final Amount is: {Final_amount} Rs")

elif Purchase_amount>=2000 and Purchase_amount<5000:

    Discount=Purchase_amount*0.1

    Final_amount=Purchase_amount-Discount

    print(f"Your Discount is: {Discount} Rs")
    print(f"Your Final Amount is: {Final_amount} Rs")   

