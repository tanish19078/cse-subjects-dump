# ques 3


# a={'Aman': 90, 'Riya': 85, 'Tina': 92}
# b=input()
# for i in a:
#     if i==b:
#         print(a[i])
#         break

# # ques 1
# a=[int(i) for i in input().split()]
# print(a)

# a=int(input())
# for i in range(a):
#     print(i*i)
# b={}

# a=eval(input())
# b={}

# for i in a:
#     if i in b:
#         b[i]+=1
#     else:
#         b[i]=1

# print(b)

# a=input()
# w=a.split()
# b={t: w.count(t) for t in w}
# print(b)

# s=input()
# a={w:s.split().count(w) for w in s.split()}
# print(a)
# a=int(input())
# b={}
# for i in range(1,a+1):
#     b[i]=(i*i)
# print(b)

# s1=eval(input())
# s2={}
# for key,value in s1.items():
#     s2[value]=key
# print(s2)
# a=eval(input())
# m1=max(a,key=a.get)
# print(m1)

# a=eval(input())
# b={}

# for key,value in a.items():
#     if value != None:
#         b[value]=key
# print(b)

# s1=eval(input())
# s2=eval(input())
# s3={}
# for key,value in s1.items():
#     s3[key]=value
# for key,value in s2.items():
#     if key in s3:
#         s3[key]+=value
#     else:
#         s3[key]=value

# print(s3)

# d1 = {}
# d2 = {}
# d3 = {}
# n = int(input())
# for i in range(1,n+1):
#     key = input("enter key1:")
#     val = int(input("enter value1:"))
#     d1[key] = val
# for j in range(1,n+1):
#     key1  = input("enter key2:")
#     val1 = int(input("enter value2:"))
#     d2[key1] = val1
# print(d1)
# print(d2)
# for k in d1:
#     for m in d2:
#         if k==m:
#             d3[k] = d1.get(k,0)+d2.get(k,0)
#         else:
#             d3[k] = d1[k]
#             d3[m] = d2[m]
# print(d3)

# Write your solution here

a  = int(input())
b = input()
c = {}
c[b] = a
print(c)