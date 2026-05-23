# # project

# # read input from file
# with open('students.txt', 'r') as f:
#     data = f.readlines()
#     for line in data:
#         try:
#             name, s1, s2, s3 = line.split()
#             total = int(s1) + int(s2) + int(s3)
#             avg = total / 3

#             if avg >= 75:
#                 REMARK = "Distinction"
#             elif avg >= 60:
#                 REMARK = "First Class"
#             elif avg >= 50:
#                 REMARK = "Second Class"
#             else:
#                 REMARK = "Fail"

#             print(f"{name},{total},{avg:.2f},{REMARK}")

#         except ValueError:
#             print(f"Skipping invalid line: {line.strip()}")
#             continue

# # add results to output file
# with open('report.txt', 'w') as out:
#     for line in data:
#         try:
#             name, s1, s2, s3 = line.split()
#             total = int(s1) + int(s2) + int(s3)
#             avg = total / 3

#             if avg >= 75:
#                 REMARK = "Distinction"
#             elif avg >= 60:
#                 REMARK = "First Class"
#             elif avg >= 50:
#                 REMARK = "Second Class"
#             else:
#                 REMARK = "Fail"

#             out.write(f"{name},{total},{avg:.2f},{REMARK}\n")

#         except ValueError:
#             print(f"Skipping invalid line: {line.strip()}")
#             continue

# # \end project
