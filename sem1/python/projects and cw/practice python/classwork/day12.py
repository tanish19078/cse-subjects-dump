# # # tupples

# # a=(1,2,3,4,5)
# # s=a[-1:]
# # print(s)

# # # updation in tupple
# # # tupple to list then changes and then list to tupple
# # l=list(a)
# # l[0]=10
# # a=tuple(l)
# # print(a)

# # indexing
# # //practice

# # # 1. reverse of  tupple
# a=(10,20,30,40,50)
# # s=a[::-1]
# # print(s)

# # combine tupples and remove  duplicates
# b=(60,70,80,90,10,20)
# c=a+b #concatentation
# d=tuple(set(c))
# # ascending order
# e=sorted(d)
# print(tuple(e))

# # REMOVING DUPLICATES FROM TUPLES WITHOUT SET FUNCTION
# C=[] #a+b
# for i in c:
#     if i not in C:
#         C.append(i)
# print(tuple(C))

# add or deleete elements in tupple

# a=(10,20,30,40,50,60,10,50,64,70)
# l=list(a)
# l.append("python")
# l.remove(20)
# a=tuple(l)
# print(a)

