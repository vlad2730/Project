import React,{Component} from "react";

import ReactDOM from "react-dom";
import axios from "axios";

import CommentAdd from "./CommentAdd";
import Comment from "./Comment";

class CommentGroup extends Component {
    constructor(props) {
      super(props);
  
      let arrUrl = window.location.href.split('/');
      let storyId = arrUrl[arrUrl.length - 1];
  
      this.state = {
        comments: [],
        storyId: storyId
      }
  
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    componentWillMount() {
      axios.get(`/https://jordan.ashton.fashion/api/goods/30/comments/ ${this.state.storyId}`).then(response => {
        this.setState({ comments: response.data });
      });
    }
    handleCommentSubmit(data) {
      const postData = {
        comment: data,
        storyId: this.state.storyId
      };
      axios.post('/https://jordan.ashton.fashion/api/goods/30/comments/', postData).then((response) => {
        console.log('response', response.data);
        let comments = this.state.comments;
        comments.unshift(response.data);
        this.setState({ comments: comments });
      });
    }
    renderComments() {
      const { comments } = this.state;
      return comments.map((comment, id) => {
        return (
          <Comment key={id} comment={comment}/>
        );
      })
    }
    render() {
      return (
        <div>
          {this.renderComments()}
          <CommentAdd handleCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  }
  

  
  // if (document.getElementById('comments-wrapper')) {
  //   ReactDOM.render(<CommentGroup />, document.getElementById('comments-wrapper'));
  // }
export default CommentGroup;