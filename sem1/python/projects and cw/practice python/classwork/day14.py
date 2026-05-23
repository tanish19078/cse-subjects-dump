# tupples

# 2. Given two sets A = {1,2,3} and B = {3,4,5}, find their union and intersection.
A = {1, 2, 3}
B = {3, 4, 5}

a=A.union(B) 
b=A.intersection(B)

print(a)
print(b)

# 1 . print even numbers from 1-10
s=set()
for i in range(1,11):
    if i%2==0:
        s.add(i)
print(s)

    # 4. Convert the list ['apple', 'banana', 'apple', 'orange'] to a set and back to a list.
d=['apple', 'banana', 'apple', 'orange']
e=set(d)
print(e)
f=list(e)
print(f)

# 3. Remove an element safely from a set without raising an error.
s1={1,2,3,4,5,6,7,9,19}
s1.pop()
print(s1)

# 5. Create a frozen set of vowels and try adding an element (observe the error).
frozen = frozenset(["a","e","i","o","u"])
frozen.add('z')
print(frozen)