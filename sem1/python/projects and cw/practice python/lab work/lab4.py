# array=[3,10,20,4,7,1,2,3,4,5]

# print (sum(array))

# Type your code here
# n = int(input("Enter number:")) #find the sum of digits on no 'n'
# total = 0 
# while n > 0:
    # sum += n % 10 
    # n //= 10       
# print(sum)


# remove duplicates from list

# list1 = [10,20,30,10,20,40,50,25,45,10,52,20,206,30,56023,10]
# list2 = []

# for i in list1:
    # if i not in list2:
        # list2.append(i)
# print(list2)

# fibonacci series

# def fib_sequence(n):
# n = int(input("Enter number of terms:"))

# print the first n terms of the Fibonacci sequence
# def fib_sequence(n):
    # Print the first n terms of the Fibonacci sequence
    # a = 0
    # b = 1
    # if n <=/ 0:
        # print("Please enter a positive integer")
    # elif n == 1:
        # print(a)
    # else:
        # print(a, b, end=" ")
        # for i in range(2, n):
            # c = a + b
            # print(c, end=" ")
            # a = b
            # b = c

# marks = []
# while True:
    # mark = int(input())
    # marks.append(mark)
    # choice = input().strip().lower()
    # if choice == 'n':
        # break
# average = sum(marks) // len(marks)
# print(average)
        
# sum of digits 
# n = int(input("Enter number:")) #find the sum of digits on no 'n'
# total = 0
# while n > 0:
    # total += n % 10 
    # n //= 10

# print(total)

# reverse a number

# n=int(input())
# rev=0
# while(n>0):
    # dig=n%10
    # rev=rev*10+dig
    # n=n//10

# print("Reversed Number:",rev)