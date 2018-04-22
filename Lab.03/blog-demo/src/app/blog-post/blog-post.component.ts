import { Component } from "@angular/core";
import { BlogPost } from "./blog-post";
import { PostComment } from "../post-comment/post-comment";

@Component({
    selector:'blog-post',
    templateUrl:'./blog-post.component.html'
})
export class BlogPostComponent{

    isInEditMode = false;
    isAddNewCommentActive = false;
    newComment: PostComment;
    tempNick = "";    
    tempContent = "";

    post = new BlogPost(
        "New Post",
        new Date(),
        "some content",
        [new PostComment("User1", new Date(), "comment 1"),
        new PostComment("User2", new Date(), "comment 2")]
    );

    toggleEditMode() : void {
        this.isInEditMode = !this.isInEditMode;
    }

    toggleAddNewComment() : void {
        this.isAddNewCommentActive = !this.isAddNewCommentActive;
    }

    addNewComment(nick : string, content : string) : void {
        this.isAddNewCommentActive = false;
        this.newComment = new PostComment(nick, new Date(), content);
        this.post.comments.push(this.newComment);
        this.tempNick = "";    
        this.tempContent = "";
    }

    removeComment(i) {
        this.post.comments.splice(i, 1);
    }

}