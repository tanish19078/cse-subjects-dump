#include <stdio.h>
// print first 10 natural numbers using recursion
void NaturalNumbers(int n) {
    if (n > 0) {
        NaturalNumbers(n - 1);
        printf("%d ", n);
    }
}
// sum of numbers from 1 to n using recursion
int sum(int n) {
    if (n == 0) {
        return 0;
    }
    return n + sum(n - 1);
}

// print elements of an array using recursion
void printArray(int arr[], int n) {
    if (n == 0) {
        return;
    }
    printArray(arr, n - 1);
    printf("%d ", arr[n - 1]);

}

// print odd and even numbers  from 1 to n using recursion
void printOddEven(int n) {
    if (n == 0) {
        return;
    }
    printOddEven(n - 1);
    if (n%2==0){
        printf("Even%d ",n);
    } else {
        printf("Odd%d ",n);
    }
}

// pointers
// int main() {
//     int *ptr,q;
//     q=50;
//     ptr=&q;
//     printf("Value of q: %d\n", q);
//     printf("Address of q: %p\n", &q);
//     printf("Value of ptr: %p\n", ptr);
//     printf("Value pointed to by ptr: %d\n", *ptr);
//     return 0;
// }


// int main(){
//     int *ptr=NULL;
//     printf("%d",ptr);
//     return 0;
// }

// int main() {
//     int *ptr=(int*)malloc(sizeof(int));
//     printf("%d",sizeof(ptr));
//     free(ptr);
//     printf("%d",*ptr);
//     ptr=NULL;
//     return 0;
// }

// call by value and call by reference
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}   
void swapByReference(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
