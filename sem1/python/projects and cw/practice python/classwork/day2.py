#data types and operators 

#mini project - billing system

# menu : item->price
menu = {
    "burger": 50,   
    "pizza": 100,
    "pasta": 80,
    "salad": 40,
    "soda": 20,
}

order = {} 
tax_rate = 0.18  

def display_menu():
    for item, price in menu.items():
        print(f"{item.title()}: Rs. {price}")

print("Welcome to the canteen!")
print("Menu:")
display_menu()

for item , price in menu.items():
    quantity = int(input(f"How many {item}s would you like to order? "))
    if quantity > 0:
        order[item] = quantity

selected_items = ", ".join([f"{item} x {quantity}" for item, quantity in order.items()])
print(f"You have ordered: {selected_items}")

total_cost = sum(menu[item] * quantity for item, quantity in order.items())
total_cost_with_tax = total_cost * (1 + tax_rate)
print(f"Total cost (including tax): Rs. {total_cost_with_tax:.2f
                                         
}")

#bill calculation

print("Here is your bill:")  

for item, quantity in order.items():
    item_cost = menu[item] * quantity
    print(f"{item.title()} x {quantity} = Rs. {item_cost}")
print(f"Total cost (including tax): Rs. {total_cost_with_tax:.2f}")

print("Thank you for your order! Enjoy your meal!")
print("****************\n*Canteen*\n****************")

# End of day2.py










