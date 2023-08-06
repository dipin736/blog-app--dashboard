import { Injectable } from '@angular/core';
import {Firestore,addDoc,collection,collectionData,doc,updateDoc,deleteDoc} from '@angular/fire/firestore'; 
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // loadData!:Observable<any[]>

  constructor(private firestore:Firestore,private toastr:ToastrService) { }


  async saveData(data:any){
    const categoriesCollection = collection(this.firestore, 'categories');
    const categoryData = {
      category: data.category
    };
    await addDoc(categoriesCollection, categoryData).then((categoryRef) => {
      console.log(categoryRef, 'Category document saved successfully');
      this.toastr.success('Data Inserted Sucessfully!....')
    })
    .catch((err) => {
      console.error('Error adding category document: ', err);
      this.toastr.error('Error adding category document!....')

    });
  
  }

  // getData(){
  //   const categoriesCollection = collection(this.firestore, 'categories');
  //   collectionData(categoriesCollection,{idField:'id'}).subscribe((val)=>{
  //     console.log('retrieve data',val)
  //   })
  //   this.loadData=collectionData(categoriesCollection,{idField:'id'})
  // }

  getData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection, { idField: 'id' });
  }

  async updateData(id:any,EditData:any){
    const docCollection=doc(this.firestore,'categories',id);
   await updateDoc(docCollection,EditData).then(() =>{
      console.log('Category document updated successfully');
      this.toastr.success('Data Updated Sucessfully!....')
    })
  }

  async deleteData(id:string){
    const docId=doc(this.firestore,'categories',id);
   await deleteDoc(docId).then(()=>{
      console.log('Category document delete successfully');
      this.toastr.success('Data Deleted Sucessfully!....')
    })
  }

  
}
