#include <stdio.h>
/*
int main(){
    int num=50;
    int *p;
    p=&num;
    printf("%u\n",p);
    printf("The value of num is %d\n",*p);
    p=p-1;
    printf("%u\n",p);   
    printf("The value of num is %d\n",*p);

    return 0;
}
    */
// pointer arithmetic
/*

    int main(){
        int num=50;
        int *p;
        p=&num;
        printf("%u\n",p);
        printf("The value of num is %d\n",*p);
        p=p+3;
        printf("%u\n",p);
        printf("The value of num is %d\n",*p);
        p=p-3;
        printf("%u\n",p);
        printf("The value of num is %d\n",*p);

        return 0;
    }
    
*/
// double pointer -- pointer to pointer
/*

int main(){
    int a=50;
    int *p;
    int **pp;
    p=&a;
    pp=&p;
    printf("%x\n",p);
      printf("%x\n",pp);
    printf("The value of num is %d\n",*p);
    printf("The value of num is %d\n",**pp);

    return 0;
}
    */

    // function pointer

/*
    void dun(int a)
    {
        printf("The value of a is %d\n",a);
    }
int main(){
    void (*fp)(int)=&dun;
    (*fp)(10);
    return 0;
}
*/

//q1

/*
void fun(int x)
{
    x=30;

}
int main(){


int y=20;
fun(y);
printf("The value of y is %d\n",y);
return 0;
}
*/

//Q2

// take 2 inputs and store adress of var into ptr anf find sum of 2 numbers using pointer
/*


int main(){
    int a,b;
    scanf("%d%d",&a,&b);
    int *p1=&a;
    int *p2=&b;
    int sum=*p1+*p2;
    printf("%d\n",sum);
    return 0;
}
    */

// take 2 input and store address of var into ptr and find sum of 2 numbers using call by reference
int sum(int *x,int *y)
{
    return *x+*y;
}

int main(){
    int a,b;
    scanf("%d%d",&a,&b);
    int *p1=&a;
    int *p2=&b;
    int s=sum(p1,p2);
    printf("%d\n",s);
    return 0;
}


