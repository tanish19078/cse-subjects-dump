#Student Attendance Checker

#Input: total classes held, classes attended

#Calculate attendance %

#If attendance ≥ 75% → Eligible for exam

#Else → Not eligible

Total_classes_held = int(input("Enter total number of classes held: "))
Classes_attended = int(input("Enter number of classes attended: "))

Attendance_percentage = (Classes_attended / Total_classes_held) * 100

if Attendance_percentage >= 75:
    print(f"Your attendance is {Attendance_percentage:.2f}%. Eigible for the exam.")

    if Attendance_percentage < 75:
        print(f"Your attendance is {Attendance_percentage:.2f}%. Not eligible for the exam.")

        