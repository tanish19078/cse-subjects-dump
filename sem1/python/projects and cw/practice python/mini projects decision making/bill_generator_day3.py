#electricity bill calculation

units = int(input("Enter the number of units consumed: "))

if units <= 100:
 total_cost = units * 5
elif units <= 200:
 total_cost = 100 * 5 + (units - 100) * 7
elif units > 200:
 total_cost = 100 * 5 + 100 * 7 + (units - 200) * 10

print(f"Total electricity bill for {units} units: Rs. {total_cost}")


