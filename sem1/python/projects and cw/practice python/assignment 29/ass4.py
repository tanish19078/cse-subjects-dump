def calculate_bill(units):
    fixed_charge = 50
    if units <= 100:
        amount = units * 5
    elif units <= 200:
        amount = (100 * 5) + ((units - 100) * 7)
    else:
        amount = (100 * 5) + (100 * 7) + ((units - 200) * 10)
    total = amount + fixed_charge
    return total

name = input("Enter Customer Name: ")
consumer_no = input("Enter Consumer Number: ")
units = int(input("Enter Units Consumed: "))

bill_amount = calculate_bill(units)

print("\n" + "="*40)
print("        ELECTRICITY BILL")
print("="*40)
print(f"Customer Name   : {name}")
print(f"Consumer Number : {consumer_no}")
print(f"Units Consumed  : {units}")
print("-"*40)
print(f"Fixed Charge    : ₹ 50")
print(f"Total Bill      : ₹ {bill_amount}")
print("="*40)
