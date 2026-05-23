#include <stdio.h>

int area(int side){
    return side*side;
}
int simple_interest(int principal, int rate, int time){
    return (principal*rate*time)/100;
}

int is_prime(int x) {
    int isPrime = 1;
        if(x <= 1) {
            isPrime = 0;
        }

        for(int i = 2; i * i <= x; i++) {
            if(x % i == 0) {
                isPrime = 0;
                break;
            }
        }
        return isPrime;
    }

// declare 2 global variables , assign them values and print them in main function and add them in add() func
int a = 5;
int b = 10;
int add() {
    return a + b;
}


int main(){
    // int x;
    // scanf("%d", &x);
    // if(is_prime(x)) {
    //     printf("%d is a prime number.\n", x);
    // } else {
    //     printf("%d is not a prime number.\n", x);
    // }
    int result = add();
    printf("The sum of %d and %d is: %d\n", a, b, result);
    return 0;
}

