// pointer in c

#include <stdio.h>

int main()
{int x=10;
    int *pX=&x;
    int y=*pX;
    // *pX is the value at the address stored in pX, which is 10

    // %u is unsigned int, which is a data type that can only store non-negative integers // it is used to store values that cannot be negative, such as sizes and counts
    // %p is the format specifier for printing a pointer (address) in C
    // %d is the format specifier for printing an integer in C
    

    unsigned int u=20;
    printf("Value of x: %d\n", x);
    printf("Value of pX: %p\n", (void*)pX); // print the address stored in pX
    printf("Value of *pX: %d\n", *pX); // print the value at the address stored in pX
    printf("Value of y: %d\n", y);
    printf("Value of u: %u\n", u); // print the value of u

}   