#include <stdio.h>
#include <complex.h>

int quotient(int a, int b) {
    return a / b;
}

int modulus(int a, int b) {
    return a % b;
}

int simple_interest(int p, int r, int t) {
    return (p * r * t) / 100;
}

void add_complex(int a1, int b1, int a2, int b2) {
    printf("%d + %di\n", a1 + a2, b1 + b2);
}

long long power(int base, int exp) {
    long long result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

void decimal_to_binary(int n) {
    if (n == 0) {
        printf("Binary: 0\n");
        return;
    }
    int binary[32];
    int i = 0;
    while (n > 0) {
        binary[i] = n % 2;
        n /= 2;
        i++;
    }
    printf("Binary: ");
    for (int j = i - 1; j >= 0; j--) {
        printf("%d", binary[j]);
    }
    printf("\n");
}

long long sum_of_series(int n) {
    long long sum = 0;
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;          // factorial
        sum += fact / i;    // n! / n = (n-1)!
    }
    return sum;
}

int main() {
    int a, b, p, r, t, a1, b1, a2, b2, base, exp, n;
    
    printf("Enter two numbers for quotient and remainder: ");
    scanf("%d %d", &a, &b);
    printf("Quotient: %d\n", quotient(a, b));
    printf("Remainder: %d\n", modulus(a, b));
    
    printf("Enter principal, rate and time for simple interest: ");
    scanf("%d %d %d", &p, &r, &t);
    printf("Simple Interest: %d\n", simple_interest(p, r, t));
    
    printf("Enter real and imaginary parts of two complex numbers: ");
    scanf("%d %d %d %d", &a1, &b1, &a2, &b2);
    printf("Sum of complex numbers: ");
    add_complex(a1, b1, a2, b2);
    
    printf("Enter base and exponent for power calculation: ");
    scanf("%d %d", &base, &exp);
    printf("Power: %lld\n", power(base, exp));
    
    printf("Enter a decimal number for binary conversion: ");
    scanf("%d", &n);
    decimal_to_binary(n);
    
    printf("Enter n for sum of series: ");
    scanf("%d", &n);
    printf("Sum of series: %lld\n", sum_of_series(n));
    
    return 0;
}