# # # Q1 Problem Statement
# # # Tina went to a fruit market to buy some fruits. She filled her fruit basket with different types of fruits all together. But the vendor now asked Tina to separate each type of fruit and count them, so that he can make the bill. Each type of fruit has a particular number written on it. Tina finds it difficult to do so. Help her to count the number of fruits of each type. 

# # # You have given a list A of size N, which stores the number written on each fruit in the basket. Your task it to count the number of fruits of each type.
# # # Input Format:
# # # The first line contains an integer N denoting the total number of fruits in the basket 
# # # The next N line contains N integers in sorted order representing the fruit number on each type of fruit.

# # # Output Fomrat:
# # # For each fruit type, print in a new line, print the number written on the fruit and the count of that fruit in the basket separated by space.

# # # CONSTRAINTS: 
# # # 1<=N<=100 
# # # 1<=A[i]<=100 

# # # Sample Input:
# # # 7   #N: Number of fruits 
# # # #list of N numbers in sorted order denoting the fruit type  
# # # Sample Output:
# # # 1 3      #here 1 is the number written on fruit, and the count of fruit is 3 
# # # 2 1      #here 2 is the number written on fruit, and the count of fruit is 1 
# # # 3 2 
# # # 4 1

# n=int(input())  # NUMBER OF FRUITS
# # FRUIT UNIQUE NUMBER LIST
# A=[int(input()) for i in range(n)]
# count = 1
# for i in range(1, n):
#     if A[i] == A[i-1]:
#        count += 1
#     else:
#         print(A[i-1], count)
#         count = 1
      
# print(A[i],count)

# # 2 Problem Statement
# # Problem Statement:
# # You are in-charge of the cake for your niece's birthday and have decided the cake will have one candle for each year of her total age. When she blows out the candles, she’ll only be able to blow out the tallest ones.

# # For example, if your niece is turning 5 years old, and the cake will have candles of height 4,2,4,3,4 she will be able to blow out 3 candles successfully, since the tallest candle is of height 4 and there are 3 such candles.

# # Given the height of each individual candle, find and print the number of candles she can successfully blow out.

# # Input Format
# # The first line contains a single integer, n ,denoting the number of candles on the cake.
# # The second line contains n line-separated integers, where each integer describes the height of candle i.

# # Output Format
# # Print the number of candles the can be blown out on a new line.

# # For Example:
# # Sample Input 
# # 5
# # 4
# # 2
# # 4
# # 3
# # 4
# # Sample Output
# # 3
# # Explanation:
# # We have one candle of height 2 , one candle of height 3, and rest of the three candles of height 4 . Your niece only blows out the tallest candles, meaning the candles where height=4 . Because there are 3 such candles, we print 3 on a new line as output.

# # solution:
# n=int(input())  # NUMBER OF CANDLES
# # CANDLE HEIGHT LIST
# A=[int(input()) for i in range(n)]
# A.sort()
# print(max(A),A.count(A[len(A)-1])) # COUNT OF TALLEST CANDLE

# # 3 Problem Statement
# # Q12. Ms. Gabriel Williams is a botany professor at District College. One day, she asked her student Mickey to compute the average of all the plants with distinct heights in her greenhouse.
# # Formula used:
# # Average = Sum of Distinct Heights / Total Number of Distinct Heights
# # Input Format
# # The first line contains the integer, N, the total number of plants.
# # The second line contains the N space separated heights of the plants.
# # Constraints
# # 0 < N <= 100
# # Output Format
# # Output the average height value on a single line.
# # Sample Input
# # 10
# # 161 182 161 154 176 170 167 171 170 174
# # Sample Output
# # 169

# # solution:

# # n=int(input()) 
# # A=[int(input().strip()) for i in range(n)]  
# # d1 = set(A)  
# # a1 = sum(d1) / len(d1)  
# # print(int(a1))  

# # An institution decides to give Bonus to its employees. A 10% Bonus is given to all male employees and 15 percent bonus to female employees. Write a program to get salary of employees with added bonus given to them. Also if the salary of employee is less than 10000 then employee will get extra bonus of 2.5 percent. Program is accepting first input gender and second input is salary.
# # Note: Input ‘m’ for male employees and ‘f’ for female employees.

# # Sample Input:
# #              m 
# #            15000
# # Sample Output:
# #           16500
p
# # problem 1

# n=int(input().strip()) 
# pin=str(n)
# if pin==pin[::-1]:
#     print("Transaction may proceed")
# else:
#     print("Transaction Declined .")

# problem 4
# unit=int(input().strip())
# if unit<=100:
#     bill=unit*0
# elif unit<=200:
#     bill=(unit-100)*5
# elif unit>=200:
#     bill=500+(unit-200)*10
# print(bill)


# # problem 3

# x=int(input().strip()) #test case
# for i in range(x):
#     a=int(input().strip())
#     b=int(input().strip())
#     c=int(input().strip())
# A=[a,b,c]
# pr = a*b / c
# print(int(pr))

a = 3259

#reverse a number
# rev = 0
# while  a > 0:
#     b = a % 10
#     rev = (rev * 10) + b
#     a= a // 10
# print(rev)

# print("my name is parth \n i am from gujarat")
def func(a,b):
    return a+b
print(func(a,b))

func(4,5)
print(func(4,5))