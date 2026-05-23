# a={1:1,2:2,3:4,4:8,0:1}
# w=int(input())
# total=0
# # rise=1
# # for i in range(1,w+1):
# #     total+=a[(i-1)%5]
# # print(total)

# a=[1,2,4,8]
# for i in range(1,w+1):
#     total+=a[(i-1)%4]
# print(total)


# for i in range(1,w+1):
#     if i%5==1:
#         rise+=1
#     elif i%5==3:
#         rise+=4
#     elif i%5==4:
#         rise+=8 
#     elif i%5==0:
#         rise+=1
#     elif i%5==2:
#         rise+=2
# print(rise)



# ##2
f1=eval(input())
total=0
for i in f1:
    if i%1000==0:
        total+=i//1000
    else:
        total+=i//1000+1
print(total)

#3
# a=input()
# b=set("@#$")
# count=0
# for i in a:
#     if i in b:
#         print("Invalid Symbol Found")
# s=a.split()
# w=[i[::-1] for i in s]
# print(" ".join(w))
