#Write a program that calculates travel fare based on age and day of the week
#Use if/elif to assign fares for age groups and match statement to apply weekend discounts
#Print the final fare from a base price, ensuring conditionals and match statements are applied correctly.

age = int(input("Enter your age: "))
day = input("Enter the day of the week: ").strip().lower()

base_fare = 10000
if age < 12:
    fare = base_fare * 0.85

elif 12 <= age <30:
    fare = base_fare * 0.90

elif 30 <= age <45:
    fare = base_fare * 0.95

elif 45 <= age <60:
    fare = base_fare * 0.90
    
elif age >=60:
    fare = base_fare * 0.85
    
    
match day:
    case "saturday" | "sunday":
        fare *= 0.90
    case _:
        fare = fare


print(f"Your travel fare is: Rs. {fare:.2f}")

