name = input("Enter Name: ")
pan = input("Enter PAN Number: ")
income = float(input("Enter Annual Income (₹): "))

if income <= 250000:
    tax = 0
elif income <= 500000:
    tax = income * 0.05
elif income <= 1000000:
    tax = income * 0.20
else:
    tax = income * 0.30

print("\n" + "="*40)
print("             INCOME TAX SLIP")
print("="*40)
print(f"Name          : {name}")
print(f"PAN Number    : {pan}")
print(f"Annual Income : ₹ {income:.2f}")
print("-"*40)
print(f"Tax Payable   : ₹ {tax:.2f}")
print("="*40)
