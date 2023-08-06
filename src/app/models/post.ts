export interface Post {
    id:string;
    title:string,
    permalink:string,
    category:{
        categoryId:'',
        category:'',
    }
    postImgPath:string,
    excerpt:string,
    content:string,
    isFeatured:boolean,
    views:number,
    status:string,
    cretaedAt:Date,
    


}
