import React from 'react';
import ForumHead from './forum-head/forum-head';

class Forum extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <ForumHead />
            </div>
        )
    }
}

export default Forum;