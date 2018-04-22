import { PostComment } from "../post-comment/post-comment";

export class BlogPost{
    constructor(
        public title : string,
        public date : Date,
        public content : string,
        public comments : Array<PostComment> = []){}
}