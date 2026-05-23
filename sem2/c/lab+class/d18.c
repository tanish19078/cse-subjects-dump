#include <stdio.h>

// 14. Even/Odd
int checkEven(int n){
    return n % 2 == 0;
}

// 15. Pointer sizes
void pointerSizes(){
    printf("int* = %lu\n", sizeof(int*));
    printf("char* = %lu\n", sizeof(char*));
    printf("float* = %lu\n", sizeof(float*));
    printf("double* = %lu\n", sizeof(double*));
}

// 16. Double pointer
void doublePointerDemo(){
    int a = 10;
    int *p = &a;
    int **q = &p;
    printf("Value using double pointer = %d\n", **q);
}

// 17. Change value using pointer
void changeValue(int *x){
    *x = 50;
}

// 18. Fibonacci series
void fibonacci(int n){
    int a = 0, b = 1, c;
    printf("Fibonacci: ");
    for(int i = 1; i <= n; i++){
        printf("%d ", a);
        c = a + b;
        a = b;
        b = c;
    }
    printf("\n");
}
/*
int main(){
    int n;

    // Q14
    scanf("%d", &n);
    if(checkEven(n)) printf("Even\n");
    else printf("Odd\n");

    // Q15
    pointerSizes();

    // Q16
    doublePointerDemo();

    // Q17
    int a = 10;
    changeValue(&a);
    printf("Changed value = %d\n", a);

    // Q18
    scanf("%d", &n);
    fibonacci(n);

    return 0;
}
*/

/*

int main(){
    int a=20;
    int *p;
    p = &a;
    printf("%p\n",p);
    p++;
    printf("%p\n",p);
    return 0;


}
    */
/*
    int main(){
        int a=50;
        int b=3;
        int *p;
        p = &b;
        printf("%u\n",p);
        p=p+b;
        printf("%u\n",p);
        return 0;
    }

*/

// add 2 numbers using pointers
/*
    int main(){
int a=10;
int b=20;
int *p1 = &a;
int *p2 = &b;
int sum = *p1 + *p2;
printf("Sum = %d\n", sum);
return 0;

    }
*/

// subtract 2 numbers using pointers
/*
    int main(){
int a=10;
int b=20;
int *p1 = &a;
int *p2 = &b;
int diff = *p1 - *p2;
printf("Difference = %d\n", diff);
return 0;
    }
*/  

// multiply 2 numbers using pointers
/*

    int main(){
int a=10;   
int b=20;
int *p1 = &a;
int *p2 = &b;
int product = (*p1) * (*p2);
printf("Product = %d\n", product);
return 0;
    }
*/

// check if number is palindrome 

int palindrome(int n){
    int original = n, reversed = 0;
    while (n != 0) {
        reversed = reversed * 10 + n%10;
        n /= 10;
    }
    return original == reversed;
}

int armstrong(int n){
    int original = n, sum = 0;
    // find length of number
    int length = 0, temp = n;
    while (temp != 0) {
        length++;
        temp /= 10;
    }
    // calculate sum of digits raised to the power of length
    while (n != 0) {
        int digit = n % 10;
        int power = 1;
        for (int i = 0; i < length; i++) {
            power *= digit;
        }
        sum += power;
        n /= 10;
    }

    return original == sum;
}

// gcd of 2 numbers 
int gcd(int a, int b){
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


int main(){
    int n;
    scanf("%d", &n);
    // if(palindrome(n)) printf("Palindrome\n");
    // else printf("Not Palindrome\n");
    if(armstrong(n)) printf("Armstrong\n");
    else printf("Not Armstrong\n");
    printf("GCD = %d\n", gcd(48, 18));
    return 0;
}


