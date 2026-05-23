# # lists creation

# mine_list = [30,40,50,70,110,130]

# print(mine_list[0])

# num=[-2,-1,0,1,2,3,4]
# def pos_num(num):
#     pos_list = list(filter(lambda x: x >= 0, num))

#     return pos_list

# print(pos_num(num))

# REDUCE FUNCTION
# from functools import reduce
# list1 = [1,2,3,4,5]
# x=reduce(max,list1)
# print(x)


# 2d list
# 
# list1=[[1,2,3],[4,5,6],[7,8,9]]
# print(list1[0][2])

# for i in range(len(list1)):
#     print(list1[i])

# taking input>2d list/matrix>transpose of matrix

rows=int(input("enter the number of rows: "))
cols=int(input("enter the number of cols: "))
a=[]
for i in range(rows):
    matrix=[]
    for j in range(cols):
        matrix.append(int(input("enter the element: ")))
    a.append(matrix)
print (a)

# # transpose=interchange rows and cols
transpose = [[a[j][i] for j in range(rows)] for i in range(cols)]

# # converting elements to string (SUBSCRIPTABLE ERROR IN PRINT (If exists))
# transpose[i][j]=str(transpose[i][j])

print(transpose)

# idenytity matrix

identity = [[1 if i == j else 0 for j in range(rows)] for i in range(cols)]
print(identity)



