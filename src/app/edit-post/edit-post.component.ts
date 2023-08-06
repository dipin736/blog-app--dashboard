import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId!: string;
 postForm!:FormGroup
  postData!: Post;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
        title:['',[Validators.required,Validators.minLength(10)]],
        permalink:['',Validators.required],
        excerpt:['',[Validators.required,Validators.minLength(50)]],
        category:['',Validators.required],
        postImg:['',Validators.required],
        content:['',Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.postsService.getOneData(this.postId).subscribe((post: Post | undefined) => {
        if (post) {
          this.postData = post;
          this.postForm.patchValue(this.postData);
        } else {
          // Handle case where post is not found (e.g., redirect to an error page)
        }
      });
    });
  }

}
