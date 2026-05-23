#include <stdio.h>
#include <string.h>
// find lenght of string

// int main(){
//     char str[100];
//     int i=0;
//     int cnt=0;
//     fgets(str,sizeof(str),stdin);
//     while (str[i]!='\0'){
//         if(str[i]!=' ' && str[i]!='\n'){
//             cnt++;
//         }
//         i++;
//         }
    
//     printf("Length of string: %d",cnt);
//     }

// reverse a string
/*
int main(){
    char str[1000];
    int i=0;
    fgets(str,sizeof(str),stdin);
    // while (str[i]!='\0'){
    //     i++;
    // }
    int len=strlen(str);
    for (i=len-1;i>=0;i--){
        printf("%c",str[i]);
        
    }
}
*/
// count number of words in a string

int main(){
    char str[100];
    fgets(str,strlen(str),stdin);
    int i=0,cnt=0;
    while (i!='\0'){
        if (str[i]==' ' || str[i]=='\n'){
            cnt++;
        }
        i++;
    }
}