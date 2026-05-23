#90> a
#80-90 b
#70-80 C
#60-70 D
#<60 fail

MARKS_PERCENTAGE =int(input("Enter MARKS_PERCENTAGE= "))

if MARKS_PERCENTAGE>=90:
 print("GRADE = A")

elif MARKS_PERCENTAGE>=80:
    print("GRADE = B")

elif MARKS_PERCENTAGE>=70:
    print("GRADE = C")  

elif MARKS_PERCENTAGE>=60:
    print("GRADE = D")

else:
    print("GRADE = FAIL")   