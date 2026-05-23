# functions in python are defined using the def keyword

# factorial of numbers upto 996 as max recursion depth exceeds up >996

# n=int(input("Enter a number: "))
# def factorial(n):
    # if n == 0 or n == 1:
        # return 1
    # else:
        # return factorial(n-1) * n
# print(factorial(n))

# lcm of two numbers

# x=int(input("Enter first number: "))
# y=int(input("Enter second number: "))

# def lcm(x, y):
    # if x > y:
        # greater = x
    # else:
        # greater = y

    # while True:
        # if greater % x == 0 and greater % y == 0:
            # lcm = greater
            # break
        # greater += 1

    # return lcm

# print(f"The LCM of {x} and {y} is {lcm(x, y)}")

# print prime numbers for a first n numbers

# n = int(input())
# def is_prime(num):
    # if num <= 1:
        # return False
    # for i in range(2, int(num**0.5) + 1):
        # if num % i == 0:
        #    return False
    # return True

# for number in range(2, n + 1):
    # if is_prime(number):
        # print(number)

