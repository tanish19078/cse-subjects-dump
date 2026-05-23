Book_delay_days=int(input("Enter The Number Of Days The Book Is Delayed: "))

if Book_delay_days<=5:
    Fine=Book_delay_days*2

    print(f"Your Fine Is: {Fine} Rs")
elif 6<=Book_delay_days<=10:
    Fine=(Book_delay_days)*4

    print(f"Your Fine Is: {Fine} Rs")

elif Book_delay_days>10:
    Fine=(Book_delay_days)*6

    print(f"Your Fine Is: {Fine} Rs")   

