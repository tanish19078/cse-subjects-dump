#include <stdio.h>
#include <string.h>
/*
void main(){
    struct complex{
        float real;
        float complex;
    }a,b,c;
    scanf("%f%f",&a.real,&a.complex);
    scanf("%f%f",&b.real,&b.complex);
    c.real=a.real+b.real;
    c.complex=a.complex+b.complex;
    printf("%f + %fi",c.real,c.complex);
}
*/

// typedef
/*
typedef struct complex{
    float real;
    float complex;
}_COMPLEX;   
void swap(_COMPLEX a, _COMPLEX b){
    _COMPLEX temp;
    temp=a;
a=b;
b=temp;
}
void main(){
    _COMPLEX a,b;
    scanf("%f%f",&a.real,&a.complex);
    scanf("%f%f",&b.real,&b.complex);
    swap(a,b);


    printf("a: %f + %fi\n",a.real,a.complex);
    printf("b: %f + %fi\n",b.real,b.complex);

}
*/

// union and struct
/*
union data{
    int i;
    float f;
    char str[20];
};
void main(){
    union data d;
    d.i=10;
    printf("d.i: %d\n",d.i);
    d.f=3.14;
    printf("d.f: %f\n",d.f);
    d.str[0]='H';
    d.str[1]='i';
    d.str[2]='\0';
    printf("d.str: %s\n",d.str);
}
*/
// #include <stdio.h>
// void main(){
//     struct complex{
//         float real;
//         float cmplex;
//     }
//     a,b,c;
//     scanf("%f %f,&a.real,&a.cmplex");
//     scanf("%f %f,&b.real,&b.cmplex");
//     c.real = a.real + b.real;
//     c.cmplex = a.cmplex + b.cmplex;
//     printf("%f + %fj",c.real,c.cmplex);
// }

/*
union job
{
    char name[32];
    float salary;
    int worker_no;
}u;
struct job1{
    char name[32];
    float salary;
    int worker_no;
}s;
void main(){
    printf("size of union=%d",sizeof(u));
    printf("\n size of structure =%d",sizeof(s));
}
*/

/*
union Data {
    int i;
    float f;
    char str[20];
};
int main(){
    union Data data;
    data.i=10;
    data.f=220.5;
    strcpy(data.str,"C programming");
    printf("data.i : %d\n",data.i);
    printf("data.f : %d\n",data.f);
    printf("data.str : %d\n",data.str);
    return 0; 
}

*/



