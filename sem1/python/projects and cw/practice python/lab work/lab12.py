# Suhani wants to send some secret message to her friend. To maintain the secrecy of the message she needs to 

# encrypt the message before sending it to her friend. Help Suhani to change the message by the following approach:

# First Enter the message in the form of a string along with a numerical key for changing that 

# message. Every character of the message will be changed depending upon this key.

# For example, if the entered message is ‘like’ and key value is 3 then it shifts each character of

# ‘like’ by 3, ‘l’ is replaced with ‘o’, i is replaced with ‘l’, ‘k’ is replaced with ‘n’ and ‘e’ is 

# replaced with ‘h’. Final message after conversion will be ‘olnh’.

# If the entered message is ‘zebra’ and the key is 3 every character is shifted by 3. Then ‘z’ is 

# replaced with ‘c,’ ‘e’ is replaced with ‘h’, ‘b’ is replaced with ‘e’, ‘r’ is replaced with ‘u’ and ‘a’ is ‘d’.

# Final message after conversion will be ‘cheud’. 

# Note: Lowercase and Uppercase letters have different ASCII values, so treat them separately. 

# Also, consider the alphabetic sequence in a circular manner such as after Z the next character will be A.

# Input Format: 

# The first line of input contains a string that represents the message (without space between characters) 

# need to send by Suhani.

# The second line of input contains a numeric key value.

# Output Format:

# # The only line of output prints the message after shifted or encrypted according to given key value.

# a,b=input().split()
# b=int(b)

# Password Strength Filter (filter + String methods)
# Problem Statement:
# A system admin wants to filter strong passwords from a list.

# A password is strong if its length ≥ 8 and it contains at least one digit.

# Input Format:
# One line containing space-separated passwords.


# Output Format:
# List of strong passwords.


# Example:
# Input:

# admin123 root pass12345 data@21 weak

# Output:

# ['admin123', 'pass12345', 'data@21']

a=input().split()
b=[i for i in a if len(i)>=8 and any(c.isdigit() for c in i) ]
print(b)