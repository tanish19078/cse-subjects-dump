# Q1. Samita is assigned a task by her class teacher to convert a list into 2-d list. Help Samita to complete her task. The task detail is given below:
# Given a list, the task is to split the list at every Nth element and create a 2-d list.

# Sample Input format:
# n-nth element for splitting
# list- single line input list of any length
# Output format:
# 2d list
# Sample Input
# 4
# 4 5 6 7 8 9 1 2 3 4 5 6 6
# Sample Output:
 
# [['4', '8', '3', '6'], ['5', '9', '4'], ['6', '1', '5'], ['7', '2', '6']]
# a=int(input())
# b=input().split()
# c=[]
# for i in range(a):
#     d=[]
#     for j in range(i,len(b),a):
#         d.append(b[j])
#     c.append(d)
# print(c)

# # by slicing
# a=int(input())
# b=input().split()
# c=[b[i::a] for i in range(a)] #step size=a
# print(c)


    # Write a program to do basic string compression. For a character which is consecutively repeated more than once, replace consecutive duplicate occurrences with the count of repetitions

# Example:
# If a string has 'x' repeated 5 times, replace this "xxxxx" with "x5".

# The string is compressed only when the repeated character count is more than 1.


# Note:
# You are not required to print anything. It has already been taken care of. Just implement the given function.
# Input Format:
# The first and only line of input contains a string without any leading and trailing spaces.


# Output Fomrat:
# The output contains the string after compression printed in single line.



# Constraints :
# 0 <= N <= 10^6

# Where 'N' is the length of the input string.

# Time Limit: 1 sec

# Input 1:
# aaabbccdsa
# Output 1:
# a3b2c2dsa

# Explanation for Sample Output 1:
# In the given string 'a' is repeated 3 times, 'b' is repeated 2 times, 'c' is repeated 2 times and 'd', 's' and 'a' and occuring 1 time hence no compression for last 3 characters.

x=input()
count=0
s=""
for i in range(len(x)):
    if x[i]==x[i-1]:
        count+=1
    else:
        if count>1:
            s+=x[i-1]+str(count)
        else:
            s+=x[i-1]
        count=1
if count>1:
    s+=x[-1]+str(count)
else:
    s+=x[-1]
print(s)

