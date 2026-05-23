name = input("Enter Member Name: ")
member_id = input("Enter Membership ID: ")
late_days = int(input("Enter Number of Late Days: "))

if late_days <= 5:
    fine = late_days * 2
elif late_days <= 10:
    fine = late_days * 5
elif late_days <= 30:
    fine = late_days * 10
else:
    fine = late_days * 20

print("\n" + "="*40)
print("          LIBRARY FINE RECEIPT")
print("="*40)
print(f"Member Name    : {name}")
print(f"Membership ID  : {member_id}")
print(f"Late Days      : {late_days}")
print("-"*40)
print(f"Total Fine     : ₹ {fine}")
print("="*40)
