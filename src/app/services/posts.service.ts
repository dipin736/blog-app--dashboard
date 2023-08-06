import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import {Firestore,addDoc,collection,collectionData,doc,updateDoc,deleteDoc,docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  downloadUrl!: string;


  constructor(private storage: AngularFireStorage, private firestore:Firestore, private toastr:ToastrService,
   private router:Router ) { }
   async uploadImage(selectedImg: any, postData: Post, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
  
    const storageRef = this.storage.ref(filePath);
    console.log(storageRef);
  
    try {
      if (selectedImg) {
        // Upload the selected image to Firebase Storage
        const task = await storageRef.put(selectedImg);
  
        // Get the download URL of the uploaded image
        const downloadURL = await task.ref.getDownloadURL();
  
        this.downloadUrl = downloadURL; // Save the download URL for later use if needed
        console.log(downloadURL);
  
        // Update the postImgPath only if a new image is selected during the edit process
        postData.postImgPath = downloadURL;
      }
  
      console.log(postData);
  
      if (formStatus == 'Edit') {
        this.updateData(id, postData);
      } else {
        this.saveData(postData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Handle the error appropriately
    }
  }
  
  async saveData(postWithImage:any){
    const categoriesCollection = collection(this.firestore, 'posts');
    await addDoc(categoriesCollection,postWithImage).then((categoryRef) => {
    console.log(categoryRef, 'Category document saved successfully');
    this.toastr.success('Data Inserted Sucessfully!....')
    this.router.navigate(['/post'])
  })
  .catch((err) => {
    console.error('Error adding category document: ', err);
    this.toastr.error('Error adding category document!....')

   });

  }

  getData(): Observable<any[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' });
  }

    async editData(id: string, updatedData: any) {
      const docRef = doc(this.firestore, 'posts', id);
      try {
        await updateDoc(docRef, updatedData);
        console.log('Post document updated successfully');
        this.toastr.success('Data Updated Successfully!....');
        this.router.navigate(['/post']); // Optionally, navigate back to the post list page after update
      } catch (error) {
        console.error('Error updating post document: ', error);
        this.toastr.error('Error updating post document!....');
      }
    }

    getOneData(id: any): Observable<Post> {
      const postRef = doc(this.firestore, 'posts', id);
      return docData(postRef) as Observable<Post>;
    }


    async updateData(id:any,postData:any){
      const postDocData = doc(this.firestore, 'posts',id);
      await updateDoc(postDocData,postData).then(() =>{
        console.log('Data document updated successfully');
        this.router.navigate(['/post'])
        this.toastr.success('Data Updated Sucessfully!....')
      })

    }


    deletePost(postId: string) {
    const postDocRef = doc(this.firestore, 'posts', postId);
    return deleteDoc(postDocRef) ;
  }

    async markFeatured(id:any,featureData:any){
      const postDocData = doc(this.firestore, 'posts',id);
      await updateDoc(postDocData,featureData).then(() =>{
        console.log('Data document updated successfully');
        this.toastr.info('Featured Status Updated....')
      })
    }
  
}
