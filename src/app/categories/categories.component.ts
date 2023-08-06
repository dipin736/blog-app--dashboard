import { Component,OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categoriesData: Category[] = [];
    formCategory:any;
    formStatus:string='Add'
    categoryId:any;

    constructor(private categoryService:CategoriesService) { }

    ngOnInit(): void {
      this.categoryService.getData().subscribe((data)=>{
        this.categoriesData=data;
      })
    }

    onSubmit(formData: any) {
      const categoryData:Category = {
          category:formData.value.category,
          id: this.categoryId 
        }
        if(this.formStatus=='Add'){
          this.categoryService.saveData(categoryData)
          formData.reset()
        }
        else if(this.formStatus=='Edit'){
          this.categoryService.updateData(this.categoryId,categoryData)
          this.formStatus = 'Add';
          formData.reset();
        }

      // const subcategoryData = {
        //   SubCategory: 'SubCategory1'
        // };

        // const categoriesCollection = collection(this.firestore, 'categories');
        // addDoc(categoriesCollection, categoryData).then((categoryRef) => {
        //   console.log(categoryRef, 'Category document saved successfully');

          // Now create the subcategory document in the subcollection "subcategories"
          // const subcategoriesCollection = collection(doc(this.firestore, 'categories', categoryRef.id), 'subcategories');
          // addDoc(subcategoriesCollection, subcategoryData).then((subcategoryRef) => {
          //   console.log(subcategoryRef, 'Subcategory document saved successfully');

            // Now create the sub-subcategory document in the subcollection "subsubcategories"
            // const subsubcategoriesCollection = collection(doc(this.firestore, 'categories', categoryRef.id, 'subcategories', subcategoryRef.id), 'subsubcategories');
            // addDoc(subsubcategoriesCollection, subcategoryData).then((subsubcategoryRef) => {
            //   console.log(subsubcategoryRef, 'Sub-subcategory document saved successfully');
            // })
            // .catch((err) => {
            //   console.error('Error adding sub-subcategory document: ', err);
            // });
        //   })
        //   .catch((err) => {
        //     console.error('Error adding subcategory document: ', err);
        //   });
        // })
        // .catch((err) => {
        //   console.error('Error adding category document: ', err);
        // });
    }

    onEdit(category:any,id:any){
      console.log(category)
      this.formCategory=category
      this.formStatus='Edit'
      this.categoryId=id

    }

    onDelete(id:any){
      this.categoryService.deleteData(id)
    }
}
