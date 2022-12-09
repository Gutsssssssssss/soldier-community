import React, {useState, useEffect} from 'react'
import Detail from './Detail';
import { Spinner } from 'react-bootstrap';
import { useParams} from 'react-router-dom';

import RepleArea from '../Reple/RepleArea';

import axios from 'axios';
import { SpinnerDiv } from '../../Style/PostDetailCSS';
function PostArea() {

    let params = useParams();
    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);

    useEffect(() => {
        let body = {
            postNum : params.postNum
        }
      axios.post("/api/post/detail", body).then((response) => {
        if(response.data.success){
            setPostInfo(response.data.postList);
            setFlag(true);
        }
        
      }).catch((err) => {
        console.log(err);
      })
    }, []);
    
  return (
    <div>
        {Flag ? <><Detail PostInfo={PostInfo}/>
        <RepleArea postId={PostInfo._id}/></> : <SpinnerDiv>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">로딩중...</span>
    </Spinner>
    </SpinnerDiv>}
        
    </div>
  )
}

export default PostArea