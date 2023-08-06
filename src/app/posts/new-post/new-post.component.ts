import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  categories: any[] = [];

  postForm: FormGroup;

  formStatus: string = 'Add New';
  docId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.docId = params['id'];
      console.log('paramsid', params);
      if (params && params['id']) {
        this.postService.getOneData(params['id']).subscribe((post) => {
          console.log('post doc', post);
          // Here you can update the form fields with the retrieved post data.
          // For example:
          this.postForm.patchValue({
            title: post.title,
            permalink: post.permalink,
            excerpt: post.excerpt,
            category: `${post.category.categoryId}-${post.category.category}`,
            postImg: '', // Here you can set the initial value of the image field with an empty string
            content: post.content,
          });
          this.imgSrc = post.postImgPath;
          this.formStatus = 'Edit';
        });
      }
    });

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.categories = val;
      console.log('cat', this.categories);
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.postForm.get('permalink')?.setValue(title.replace(/\s/g, '-')); // Set the value of permalink form control
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    const postData: Post = {
      id: '',
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      cretaedAt: new Date(),
    };
    console.log(postData);
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
  
}
