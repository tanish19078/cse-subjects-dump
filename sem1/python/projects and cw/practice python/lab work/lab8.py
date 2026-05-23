# Problem 1: Reverse a String
"""
Given a string S, print its reverse without using slicing ([::-1]).
Input: hello
Output: olleh
"""

"""
a=input().strip()
def reverse():
    b=''.join(reversed(a))
    print(b)
reverse()
"""

# # Problem 2: Count Vowels and Consonants
# """
# Given a string S, count the number of vowels and consonants (ignore case and spaces).
# Input: OpenAI
# Output: Vowels = 4, Consonants = 2

"""
a=input().lower().strip()
def count_vowels():
    vowels_main="aeiou"
    vowels=0
    consonants=0
    for i in a:
        if i in vowels_main:
            vowels+=1
        elif i.isalpha():
            consonants+=1
    print("Vowels =",vowels,", Consonants =",consonants)
count_vowels()
"""

# Problem 3: Check for Palindrome String
"""
Check if a given string is a palindrome. Ignore spaces, punctuation, and case.
Input: Race car
Output: True
"""

"""
a=input().replace(" ","").lower().strip()
def palindrome():
    if a==a[::-1]:
        print("True")
    else:
        print("False")
palindrome()
"""

# Problem 4: Character Frequency Counter
"""
Given a string, print each character and its frequency (case-insensitive).
Input: Programming
Output: p:1 r:2 o:1 g:2 a:1 m:2 i:1 n:1
# """

"""
a=input().lower().strip()
def character_frequency():
    freq={}
    for i in a:
        if i.isalpha():
            if i in freq:
                freq[i]+=1
            else:
                freq[i]=1
            print(i,":",freq[i],sep="",end=" ")
character_frequency()
"""

# Problem 5: Remove Duplicate Characters
"""
Remove duplicate characters from a string while maintaining the original order.
Input: banana
Output: ban
"""
'''
a=input().strip()
def remove_duplicates():
    b=set()
    c=""
    for i in a:
        if i not in b:
            b.add(i)
            c+=i
    print(c)
remove_duplicates()
'''

# Problem 6: Find the Longest Word
"""
Given a sentence, find the longest word and print it along with its length.
Input: Python is amazing
Output: amazing (7)
"""


# a=input().strip()
# def longest_word():
#     words=a.split()
#     longest=""
#     for i in words:
#         if len(i)>len(longest):
#             longest=i
#     print(longest,"(",len(longest),")",sep="")
# longest_word()


# Problem 7: Anagram Checker
"""
Check if two strings are anagrams of each other (ignore spaces and case).
Input: listen, silent
Output: True




"""
# Problem 8: Count Substring Occurrences
"""
Count how many times a substring sub appears in a string S, without using .count().
Input: abababa, aba
Output: 3
"""
# a=input().strip()
# def count_substring():