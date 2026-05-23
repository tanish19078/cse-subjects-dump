#include <stdio.h>
// implement array of pointers 
/*
int main() {
    int a = 10, b = 20, c = 30;
    int *ptr[3] = {&a, &b, &c};

    for (int i = 0; i < 3; i++) {
        printf("Value at ptr[%d]: %d\n", i, *ptr[i]);
    }

    return 0;
}
*/

// multi-dimensional array of pointers

int main() {
    int a = 10, b = 20, c = 30;
    int *ptr[2][2] = {{&a, &b}, {&c, NULL}};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            if (ptr[i][j] != NULL) {
                printf("Value at ptr[%d][%d]: %d\n", i, j, *ptr[i][j]);
            } else {
                printf("ptr[%d][%d] is NULL\n", i, j);
            }
        }
    }

    