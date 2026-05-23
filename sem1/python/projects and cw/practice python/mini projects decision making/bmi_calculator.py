Weight=int((nput"Enter The Weight:"))
Height=int(input("Enter The Height:"))
BMI=Weight/(Height**2)

print(f"Your BMI is: {BMI:.2f}")

if BMI<18.5:
    print("You are Underweight")    
elif 18.5<=BMI<24.9:
    print("You are Healthy")
elif 25<=BMI<29.9:
    print("You are Overweight")
else:
    print("You are Obese")
    