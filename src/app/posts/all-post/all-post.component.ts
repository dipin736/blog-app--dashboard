import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postData: Post[] = [];
  formPost: any;


  constructor(private postService:PostsService ,private router:Router ,private toastr:ToastrService){}

  ngOnInit(): void {
    this.postService.getData().subscribe((data) => {
      this.postData = data.map((post) => {
        return {
          ...post,
          cretaedAt: this.convertTimestampToDate(post.cretaedAt)
        };
      });
    });
  }

   convertTimestampToDate(timestamp: any): Date{
    // Check if the timestamp is a Firestore Timestamp and convert it to Date
    if (timestamp && timestamp.toDate instanceof Function) {
      return timestamp.toDate();
    }
    return new Date(timestamp); // Fallback to converting with JavaScript Date constructor
  }
  
  onEdit(postId: string) {
    this.router.navigate(['/post/new'], { queryParams: { id: postId } });
  }

  
  onDelete(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).then(
        () => {
          // If the delete operation is successful, remove the post from the local array
          this.postData = this.postData.filter((post) => post.id !== postId);
          this.toastr.success('Post deleted successfully.');
        },
        (error: any) => {
          console.error('Error deleting post:', error);
          this.toastr.error('Error deleting post. Please try again later.');
        }
      );
    }
  }

  onFeatured(id:any,value:any){
      const featureData={
        isFeatured:value
      }
      this.postService.markFeatured(id,featureData)
  }

  
}
