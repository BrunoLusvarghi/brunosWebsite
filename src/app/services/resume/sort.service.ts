import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() {

   }

   runInsertionSort(arr){

    var observable = Observable.create(function(observer) {
    for (let i = 1; i < arr.length; i++) 
    {  
        
      let key = arr[i];  
       let j = i - 1;  

        while (j >= 0 && arr[j] > key) 
        {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
        
        observer.next(100*i/arr.length);
    }  

    observer.complete();
    
    });

    return observable;
   
}

   async runMergeSort(arr){
     await this.mergeSort(arr,0,arr.length -1);
     console.log(arr);
   }

   // Merges two subarrays of arr[]. 
// First subarray is arr[l..m] 
// Second subarray is arr[m+1..r] 
 merge( arr,  l,  m,  r) 
{ 
    let i, j, k; 
    let n1 = m - l + 1; 
    let n2 =  r - m; 
  
    /* create temp arrays */
    let L, R; 
  
    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++) 
        L.push(arr[l + i]); 
    for (j = 0; j < n2; j++) 
        R.push(arr[m + 1+ j]); 
  
    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; // Initial index of first subarray 
    j = 0; // Initial index of second subarray 
    k = l; // Initial index of merged subarray 
    while (i < n1 && j < n2) 
    { 
        if (L[i] <= R[j]) 
        { 
            arr[k] = L[i]; 
            i++; 
        } 
        else
        { 
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
  
    /* Copy the remaining elements of L[], if there 
       are any */
    while (i < n1) 
    { 
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
  
    /* Copy the remaining elements of R[], if there 
       are any */
    while (j < n2) 
    { 
        arr[k] = R[j]; 
        j++; 
        k++; 
    } 
} 
  

 mergeSort(arr,  l,  r) 
{ 
    if (l < r) 
    { 
        // Same as (l+r)/2, but avoids overflow for 
        // large l and h 
        let m = l+(r-l)/2; 
  
        // Sort first and second halves 
        this.mergeSort(arr, l, m); 
        this.mergeSort(arr, m+1, r); 
  
        this.merge(arr, l, m, r); 
    } 
} 
}
