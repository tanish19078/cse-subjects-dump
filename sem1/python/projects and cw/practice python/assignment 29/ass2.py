print("=== Student Grade Report Generator ===")

name = input("Enter student name: ")
roll_number = input("Enter roll number: ")

sub1 = int(input("Enter marks for Subject 1: "))
sub2 = int(input("Enter marks for Subject 2: "))
sub3 = int(input("Enter marks for Subject 3: "))

total = sub1 + sub2 + sub3
percentage = total / 3

if sub1 >= 35:
    if sub2 >= 35:
        if sub3 >= 35:
            result = "PASS"
        else:
            result = "FAIL"
    else:
        result = "FAIL"
else:
    result = "FAIL"

if percentage >= 90:
    grade = 'A'
elif percentage >= 75:
    grade = 'B'
elif percentage >= 50:
    grade = 'C'
else:
    grade = 'F'

print("\n========== Report Card ==========")
print("Name        :", name)
print("Roll Number :", roll_number)
print("Subject 1   :", sub1)
print("Subject 2   :", sub2)
print("Subject 3   :", sub3)
print("Total Marks :", total, "/ 300")
print("Percentage  :", round(percentage, 2), "%")
print("Grade       :", grade)
print("Result      :", result)
print("=================================")




