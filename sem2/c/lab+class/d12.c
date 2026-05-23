#include <stdio.h>  

// strings find length by taking input 
#include <string.h>
/*
int main(){
    char str[100];
    printf("Enter a string: ");
    gets(str);
    int len = strlen(str) - 1;
    printf("Length of the string is: %d\n", len);
    return 0;
}
*/


// without using string library functions
/*
int main(){
    char str[100];
    printf("Enter a string: ");
    gets(str);
    int len = 0;
    while(str[len] != '\0'){
        len++;
    }
    printf("Length of the string is: %d\n", len);
    return 0;
}
*/

// check string is palindrome or not
int main(){
    char str[100];
    printf("Enter a string: ");
    gets(str);
    int len = strlen(str) - 1;
    int flag = 0;
    for(int i = 0; i < len/2; i++){
        if(str[i] != str[len - i]){
            flag = 1;
            break;
        }
    }
    if(flag == 0){
        printf("The string is a palindrome\n");
    } else {
        printf("The string is not a palindrome\n");
    }
    return 0;
}
