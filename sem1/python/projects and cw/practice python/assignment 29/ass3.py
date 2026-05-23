print("=== Employee Salary Slip Generator ===")

name = input("Enter employee name: ")
emp_id = input("Enter employee ID: ")
basic_salary = int(input("Enter basic salary: "))

hra = (20 * basic_salary) // 100
da = (15 * basic_salary) // 100
pf = (12 * basic_salary) // 100

gross_salary = basic_salary + hra + da
net_salary = gross_salary - pf

print("\n=========== Salary Slip ===========")
print("Employee Name   :", name)
print("Employee ID     :", emp_id)
print("Basic Salary    :", basic_salary)
print("HRA (20%)       :", hra)
print("DA (15%)        :", da)
print("PF (12%)        :", pf)
print("Gross Salary    :", gross_salary)
print("Net Salary      :", net_salary)

remark_code = 0
if net_salary >= 100000:
    remark_code = 1
elif net_salary >= 50000:
    remark_code = 2
elif net_salary >= 20000:
    remark_code = 3
else:
    remark_code = 4

match remark_code:
    case 1:
        print("Remark          : Excellent Package")
    case 2:
        print("Remark          : Good Package")
    case 3:
        print("Remark          : Average Package")
    case 4:
        print("Remark          : Below Average")

print("===================================")

