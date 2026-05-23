#include <stdio.h>

struct Employee {
    int id;
    char name[50];
    float salary;
};

int main() {
    struct Employee emp[5]; 

    for (int i = 0; i < 5; i++) {
        printf("Enter details of employee %d\n", i + 1);

        printf("ID: ");
        while (scanf("%d", &emp[i].id) != 1) {
            printf("Invalid ID. Enter a number: ");
            while (getchar() != '\n');
        }

        printf("Name: ");
        scanf(" %[^\n]", emp[i].name);

        printf("Salary: ");
        while (scanf("%f", &emp[i].salary) != 1) {
            printf("Invalid salary. Enter a number: ");
            while (getchar() != '\n');
        }

        printf("\n");
    }

    printf("Employee Details:\n");

    for (int i = 0; i < 5; i++) {
        printf("\nEmployee %d\n", i + 1);
        printf("ID: %d\n", emp[i].id);
        printf("Name: %s\n", emp[i].name);
        printf("Salary: %.2f\n", emp[i].salary);
    }

    return 0;
}