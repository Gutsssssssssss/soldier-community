import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {UploadDiv, UploadForm, UploadButtonDiv} from '../../Style/UploadCSS';

function Edit() {
    let params = useParams();
    const [PostInfo, setPostInfo] = useState({})
    const [Flag, setFlag] = useState(false);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    let navigate = useNavigate();

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

    useEffect(() => {
      setTitle(PostInfo.title);
      setContent(PostInfo.content);
    }, [PostInfo])
 
 
    const onSubmit = (e) => {
        e.preventDefault();

        
        if (Title === "" || Content === "") {
          return alert("모든 항목을 채워주세요!");
        }

        let body = {
          title: Title,
          content: Content,
          postNum: params.postNum, 
        };

        axios.post("/api/post/edit", body).then((response) => {
          if(response.data.success) {
            alert("수정이 완료되었습니다.");
            navigate(`/post/${params.postNum}`);
          } else {
            alert("수정에 실패하였습니다.");
          }
        }).catch((err) => {
          console.log(err);
        })
    };

  return (
    <UploadDiv>
        <UploadForm>
          <label htmlFor='title'>제목</label>
        <input 
        id='title'
        type="text" 
        value={Title} 
        onChange={(event) => {
        setTitle(event.currentTarget.value);
          }}
        />
        <label htmlFor='content'>내용</label>
        <textarea
        id='content'
        value={Content} 
        onChange={(event) => {
        setContent(event.currentTarget.value);
           }}
          />
          <UploadButtonDiv>
          <button className='cancel'
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}>취소</button>
            <button 
            onClick={(e) => {
            onSubmit(e)
            }}>제출</button>
            </UploadButtonDiv> 
        </UploadForm>
    </UploadDiv>
  )
}

export default Edit