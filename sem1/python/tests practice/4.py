 # q1 . emp

# n=int(input())
# a={}
# b={}
# for i in range(n+1):
#     nae=input().split()
#     name=nae[0]
#     m1,m2,m3=map(int,nae[1:4])
#     a[name]=[m1,m2,m3]
#     b[name]=m1+m2+m3
#     print(b)

# q2 . emp

# n=int(input())
# a={}
# total=0
# for i in range(n):
#     name,count=input().split()
#     count=int(count)
#     total+=count
#     a[name]=count
#     print({total})


# q3 . emp

# n=int(input())
# attn={}
# for i in range(n):
#     b=input().split()
#     name=b[0]
#     pr=b[1:6]
#     pr_count=pr.count('P')
#     attn[name]=pr_count
#     print(attn)

# q4 . emp  
# n=int(input())
# a={}
# for i in range(n):
#     name,amount=input().split()
#     amount=int(amount)
#     if amount>5000:
#         a[name]="Gold"
#     elif amount>3000:
#         a[name]="Silver"
#     else:
#         a[name]="Regular"
# print(a)

# q6
# n=int(input())
# b={}
# for i in range(n):
#     house,units=input().split()
#     units=int(units)
#     if units<=100:
#         bill=units*5
#     elif units<=200:
#         bill=100*5+(units-100)*7
#     else:
#         bill=100*5+100*7+(units-200)*10
#     b[house]=bill
# print(b)

# q7
# n=int(input())
# a={}
# total=0
# for i in range(n):
#     name,s1,s2,s3=input().split()
#     s1,s2,s3=int(s1),int(s2),int(s3)
#     score=s1+s2+s3
#     total+=score
#     a[name]=total
# print(a)

# q8
# n=int(input())
# a={}
# for i in range(n):
#     name,cal=input().split()
#     cal=int(cal)
#     if cal>300:
#         a[name]=cal
#     else:
#         continue
# print(a)

# q9
# n=int(input())
# a={}
# b={}
# for i in range(n):
#     name,marks=input().split()
#     marks=int(marks)
#     a[name]=marks
#     top=max(a.values())
# print({name:top})
# _____________________________________________________________________________________

# q1-list comprehension
# a=list(map(int,input().split()))
# pa=[i for i in a if i>=50]
# print(pa)

# q2-map
# b=list(map(float,input().split()))
# c=[i*83 for i in b ]
# print(c)

# q3- filter/
# ages=list(map(int,input().split()))
# ad=list(filter(lambda x:x>=18,ages))
# print(ad)

# matrix = [[i * j for j in range(1, 4)] for i in range(1, 3)]
# print(matrix)
# # matrix[1][1]=99
# # print(matrix)

