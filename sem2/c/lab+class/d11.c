#include <stdio.h>

// linear and binary search
int linear_search(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; 
        }
    }
    return -1; 
}
  int binary_search(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; 

        if (arr[mid] == target) {
            return mid; 
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1; 
        }
    }
    return -1; 
}

/*
#include <stdio.h>

int main() {
	int n;
	int arr[]={1,2,443,34,24,34,5,53,5,234};
	 n=sizeof(arr)/sizeof(arr[0]);
	int target=53;
for (int i=0;i<n;i++){
    if (arr[i]==target){
        printf("found");
        break;
    }
}
}

*/


