import React from 'react'
import {useSelector} from 'react-redux'
import { Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {PostDiv, Post, BtnDiv } from '../../Style/PostDetailCSS';


import moment from "moment";
import "moment/locale/ko";


function Detail(props) {
    let params = useParams();
    let navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const SetTime = (a, b) => {
      if(a !== b) {
        return moment(b).format("YYYY년 MMMM Do, hh:mm a") + "(수정됨)";
      } else {
        return moment(a).format("YYYY년 MMMM Do, hh:mm a");
      }
    }
    

    const DeleteHandler = () => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            let body = {
                postNum : params.postNum
            }
          axios.post("/api/post/delete", body).then((response) => {
            if(response.data.success){
                alert("게시글이 삭제되었습니다.");
                navigate("/");
            }
            
          }).catch((err) => {
            alert("게시글 삭제에 실패하였습니다.");
          })
        } 
    };
    
    
  return (
    <PostDiv>
        <>
        <Post>
        <h1>{props.PostInfo.title}</h1>
        <div className="author">
        <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> {props.PostInfo.author.displayName}</p>
        <p className="time">
            {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
          </p>
        </div>
        {props.PostInfo.image ? (
        <img 
        src={`http://localhost:5000/${props.PostInfo.image}`} 
        alt="" 
        style={{width:"100%", height:"auto"}}
        />
        ) : null}
        <p>{props.PostInfo.content} </p>
    </Post>
    <br/><br/><br/>
    {user.uid === props.PostInfo.author.uid && (<BtnDiv>
        <Link to = {`/edit/${props.PostInfo.postNum}`}>
        <button className='edit'>수정</button>
        </Link>
        <button className='delete' onClick={()=>DeleteHandler()}>삭제</button>
    </BtnDiv>)}
    </>
    
    </PostDiv>
  )
}

export default Detail