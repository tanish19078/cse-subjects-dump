# take multiple inputs from user until he gives -1 and print their sum except -1 (ST Question)

# sum=0
# while True:
#     n=int(input("enter a number"))
#     if n==-1:
#         break
#     sum=sum+n
# sum=0
# print("the sum is",sum)

s=0
while True:
    n=int(input())
    if n==-1:
        break
    s+=n
print(s)

# pattern + sum + add digits of a number until it yeilds a single digit