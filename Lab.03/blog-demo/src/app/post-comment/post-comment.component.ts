import { Component, Input } from "@angular/core";

@Component({
    selector: 'post-comment',
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent{
    @Input() comment: string;
}