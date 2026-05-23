/*

#include <stdio.h>

void add(int a, int b);
void subtract(int a, int b);
void multiply(int a, int b);
void divide(int a, int b);
void remainder(int a, int b);
void power(int a, int b);

int main() {
    int a, b;
    char operator;

    printf("Enter first number: ");
    scanf("%d", &a);

    printf("Enter operator (+, -, *, /, %%, ^): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%d", &b);

    switch (operator) {
        case '+': add(a, b); break;
        case '-': subtract(a, b); break;
        case '*': multiply(a, b); break;
        case '/': divide(a, b); break;
        case '%': remainder(a, b); break;
        case '^': power(a, b); break;
        default: printf("Invalid operator\n");
    }

    return 0;
}

// Function definitions
void add(int a, int b) {
    printf("Result = %d\n", a + b);
}

void subtract(int a, int b) {
    printf("Result = %d\n", a - b);
}

void multiply(int a, int b) {
    printf("Result = %d\n", a * b);
}

void divide(int a, int b) {
    if (b != 0)
        printf("Result = %d\n", a / b);
    else
        printf("Division by zero error\n");
}

void remainder(int a, int b) {
    printf("Result = %d\n", a % b);
}

void power(int a, int b) {
    int result = 1;
    for(int i = 0; i < b; i++)
        result *= a;
    printf("Result = %d\n", result);
}

*/

// swap 2 num using call by reference
/*
#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 5, b = 10;
    printf("Before swapping: a = %d, b = %d\n", a, b);
    swap(&a, &b);
    printf("After swapping: a = %d, b = %d\n", a, b);
    return 0;
}
*/

// array pointer
/*
#include <stdio.h>  
int main() {  
    int arr[5] = {1, 2, 3, 4, 5};  
    int n=sizeof(arr)/sizeof(arr[0]);
    int (*ptr)[5];
    ptr=&arr;
    
for (int i=0;i<n;i++)
printf("%d",(*ptr)[i]);
}
*/ 
// create a ptr to array and print adress and value at pointer

/*
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int (*ptr)[5] = &arr;

    printf("%p\n", (void*)ptr);
    printf("%d\n", (*ptr)[0]); 
    return 0;
}
*/

// program to pointer to array

/*
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int (*ptr)[5] = &arr;

    for (int i = 0; i < 5; i++) {
        printf("%d ", (*ptr)[i]);
    }
    printf("\n");
    return 0;
}
*/

// read and print elements array using pointer
/*
#include <stdio.h>

int main() {
    int arr[100], n;
    int *ptr;

    scanf("%d", &n);

    ptr = arr;  

    for (int i = 0; i < n; i++) {
        scanf("%d", (ptr + i));   

    for (int i = 0; i < n; i++) {
        printf("%d ", *(ptr + i));  
    }

    return 0;
}

*/

/*

#include <stdio.h>
void main(){
    int a[4]={1,2,3,4};
    int *p=a+3;
int *ptr=a;
printf("%d",p[-2]);
}
*/

