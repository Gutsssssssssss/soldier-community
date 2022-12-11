import React from 'react'
import {Link} from 'react-router-dom';
import {ListDiv, ListItem, NoticeItem } from '../../Style/ListCSS';

import moment from "moment";
import "moment/locale/ko";

function List(props) {

  const SetTime = (a, b) => {
    if(a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm a") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm a");
    }
  }
    
  return (
    <ListDiv>

        <NoticeItem> 
        
          <p className='title'>
            <span style={{fontSize:'30px', color:'#000080'}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" class="bi bi-clipboard2-fill" viewBox="0 2 16 16">
            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
            <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z"/>
          </svg>사이트 소개</span>
          </p>
          <div className='author'>
          <p style={{color:'#000080', fontWeight:'bold'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-star-fill" viewBox="0 3 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>운영자</p>
          </div>
          <p style={{fontWeight: 'bold'}}>
          연등은 군인 혹은 예비 군인들이 정보를 주고 받을 수 있는 커뮤니티 사이트 입니다.<br/>
          로그인을 해야 글 및 댓글을 작성할 수 있습니다.
          </p>
          
        </NoticeItem> 
        
        {props.PostList.map((post, idx) => {
        return (
        <ListItem key={idx}> 
        <Link to = {`/post/${post.postNum}`}>
          <p className='title'>
            {post.title}
          </p>
          <div className='author'>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> {post.author.displayName}</p>
          <p className="time">{SetTime(post.createdAt, post.updatedAt)}</p>
          </div>
          <p>
            {post.content}
          </p>
          
          </Link>
        </ListItem>)
    })}
      
    </ListDiv>
  )
}

export default List