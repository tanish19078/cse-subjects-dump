# file handling 
# # reading a file
file=open("d16.txt","r")

content=file.read()
print(content)
file.close()

# with open("d16.txt","w") as f:
#     f.write("SV,JSON,TOOON")

# from pypdf import PdfReader
# reader=PdfReader("sample.pdf")
# number_of_pages=len(reader.pages)
# page=reader.pages[0]
# text=page.extract_text()
# print(text)

# from PIL import Image
# img=Image.open("sample.jpg")
# img.show()
# img.rotate(90).show()
# img.save("rotated_sample.jpg")

# password generator
# import base64
# import os
# import random
# import string
# def generate_password(length=12):
#     characters=string.ascii_letters + string.digits + string.punctuation
#     password=''.join(random.choice(characters) for i in range(length))
#     return password
# password=generate_password(16)
# encoded_password=base64.b64encode(password.encode()).decode()
# print("Generated Password:", password)
# print("Encoded Password:", encoded_password)
# decoded_password=base64.b64decode(encoded_password).decode()
# print("Decoded Password:", decoded_password)
# # print("Encoded Password:", encoded_password)
# # print("Decoded Password:", decoded_password)
# # print("Generated Password:", password)
