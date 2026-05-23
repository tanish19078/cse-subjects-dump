# find min and max in array
arr=[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5,50,51,95,100,0,-10,-20]
for i  in range(len(arr)):
    for j in range(i+1, len(arr)):
        if arr[i] > arr[j]:
            arr[i], arr[j] = arr[j], arr[i]
# print(arr) sorted array
print("Min:", arr[0])
print("Max:", arr[-1])

# find second min & second max in array
second_min = None 
second_max = None
for i in range(len(arr)):
    if arr[i] != arr[0]:  
        second_min = arr[i]
        break
for i in range(len(arr)-1, -1, -1):
    if arr[i] != arr[-1]:
        second_max = arr[i]
        break
print("Second Min:", second_min)
print("Second Max:", second_max)

# linear search for elements in array and out of array
arr=[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5,50,51,95,100,0,-10,-20]
# arr=sorted(arr)
for i in range(1, len(arr)):
    if arr[i] == 5:
        print(" 5 found at index", i)
        break
else:
    print(" 5 not found")

for i in range(1, len(arr)):
    if arr[i] == 7:
        print(" 7 found at index", i)
        break
else:
    print(" 7 not found")

# binary search find elements in array and out of array
arr=[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5,50,51,95,100,0,-10,-20]
B=sorted(arr)
target = int(input("Enter target to search in sorted array: "))
lb = 0
ub = len(B) - 1
found = False
while lb <= ub:
    mid = (lb+ub) // 2
    if B[mid] == target:
        print(f"{target} found at index {mid} in sorted array")
        found = True
        break
    elif B[mid] < target:
        lb = mid + 1 
    else:
        ub = mid - 1
if found==False:
    print(f"{target} not found in sorted array")
