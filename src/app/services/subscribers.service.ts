import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore:Firestore,private toastr:ToastrService) { }

  getData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'subscribers');
    return collectionData(categoriesCollection, { idField: 'id' });
  }

  async deleteData(id:string){
    const docId=doc(this.firestore,'subscribers',id);
   await deleteDoc(docId).then(()=>{
      console.log('Subscriber document delete successfully');
      this.toastr.success('Subscriber Deleted Sucessfully!....')
    })
  }


}
