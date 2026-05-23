#decision making - if & else statements

#elif = else + if 

#ticket discount system

ticket_price = 200
age = int(input("Enter your age: "))
day = input("Enter the day of the week: ").lower()

if age <=12:
    discount = 0.5
    if day == "wednesday":
        discount += 0.1

if age >=60:
    discount = 0.3

if age >12 and age <60:
    discount = 0


final_price = ticket_price * (1 - discount)
print(f"Your ticket price is: Rs. {final_price:.2f}")
    
