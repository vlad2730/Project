import React, {Component} from 'react';



 

class Comment extends Component{

constructor(props){
    super(props);
}

    render(){
        const {body}=this.props;
        const { name } = this.props;
        return(

            <div className="comment card mb-2">

                <div className="card-body">

                    <strong>{name} User: </strong> 2 hours ago <br/>{body}

                </div>

            </div>

            
        );
    }
}
export default Comment;