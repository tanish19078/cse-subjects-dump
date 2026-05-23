day4 

print 10 numbers

print("1\n2\n3\n4\n5\n6\n7\n8\n9\n10")

print Hello World 10 times

print("Hello World\n"*10)

loops - while and for loop (print 1 to 20)

while loop

i=1
while i<=20:
 print(i)
 i+=1

for loop
for i in range(1,21):
  print(i)   

fruits = ["apple", "banana", "cherry"]

for i in fruits:
    print(i)

world= "python"

for i in world:
    print(i)

for number in range (3):
 print("number")

for number in range(5):
  if number == 3:
     break
  print(number)

nested for loop

for i in range(0,4):
    for j in range(0,4):
        for k in range(0,4):
            for l in range(0,4):
                for m in range(0,4):
                     for n in range(0,4):
                      print(f"i={i},j={j},k={k},l={l},m={m},n={n}")

question 1

print sum of first 10 natural numbers

sum = 0
for i in range(5):
    x=int(input("enter a number:"))  
    sum+=x
  
    print(sum)

reverse number counting

for i in range(10,0,-1): #-1 denotes step size
    print(i)    

reverse counting using while loop
i=10
while i>0:
    print(i)
    i-=1

table of number

num=int(input("enter a number:"))

for i in range(11):
    print(f"{num} x {i} = {num*i}")

    loop sums numbers until user enters 0

number = int(input("Enter a number: "))
sum = 0
while number > 0:
    sum += number
    number = int(input("Enter a number: "))
print("Sum is:", sum)


