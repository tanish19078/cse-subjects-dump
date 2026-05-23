name = input("Enter Customer Name: ")
bill_no = input("Enter Bill Number: ")
purchase = float(input("Enter Purchase Amount (₹): "))

if purchase < 1000:
    discount = 0
elif purchase <= 5000:
    discount = purchase * 0.10
elif purchase <= 10000:
    discount = purchase * 0.20
else:
    discount = purchase * 0.30

final_amount = purchase - discount

print("\n" + "="*40)
print("         SHOPPING INVOICE")
print("="*40)
print(f"Customer Name   : {name}")
print(f"Bill Number     : {bill_no}")
print(f"Purchase Amount : ₹ {purchase:.2f}")
print(f"Discount Given  : ₹ {discount:.2f}")
print("-"*40)
print(f"Final Amount    : ₹ {final_amount:.2f}")
print("="*40)
