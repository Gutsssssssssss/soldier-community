import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCSS.js";
import { useSelector } from "react-redux";
//import Avatar from "react-avatar";

import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

function RepleContent(props) {
    const [ModalFlag, setModalFlag] = useState(false);
    const [EditFlag, setEditFlag] = useState(false);
    const [Reple, setReple] = useState(props.reple.reple);
    const user = useSelector((state) => state.user);
    const ref = useRef();
    useOnClickOutside(ref, () => setModalFlag(false));

    const SetTime = (a, b) => {
      if(a !== b) {
        return moment(b).format("YYYY년 MMMM Do, hh:mm a") + "(수정됨)";
      } else {
        return moment(a).format("YYYY년 MMMM Do, hh:mm a");
      }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            uid: user.uid,
            reple: Reple,
            postId: props.reple.postId,
            repleId: props.reple._id
        };

        axios.post("/api/reple/edit", body).then((response) => {
            if(response.data.success) {
                alert("댓글 수정이 성공하였습니다.");
            } else {
                alert("댓글 수정이 실패하였습니다.");
            }
            return window.location.reload();
        })
    };

    const DeleteHandler = (e) => {
        e.preventDefault();
        if(window.confirm("정말 삭제하시겠습니까?")) {
            let body = {
                postId: props.reple.postId,
                repleId: props.reple._id
            }
          axios.post("/api/reple/delete", body).then((response) => {
            if(response.data.success){
                alert("댓글이 삭제되었습니다.");
                window.location.reload();
            }
            
          }).catch((err) => {
            alert("댓글 삭제에 실패하였습니다.");
          })
        } 
    }
  return (
    <div>
        <RepleContentDiv>
            <div className="author">
            <div className="userInfo">
              <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> {props.reple.author.displayName}</p>
              </div>
              {
                props.reple.author.uid === user.uid && (
                <div className="modalControl">
                <span onClick={() => setModalFlag(true)}>···</span>
                {ModalFlag && (<div className="modalDiv" ref={ref}>
                    <p onClick={() => {setEditFlag(true);
                    setModalFlag(false);}}>수정</p>
                    <p className="delete" onClick={(e) => DeleteHandler(e)}>삭제</p>
                </div>)}
                
              </div>
              )}
            </div>
            <p className="time">
        {SetTime(props.reple.createdAt, props.reple.updatedAt)}
      </p>
            {EditFlag ? <RepleUploadDiv><form>
        <input type="text" value={Reple} onChange={(e) => {setReple(e.currentTarget.value);}} />
        <button onClick={(e) => {
            SubmitHandler(e);
        }}>등록</button></form>
        <div className="cancel">
        <button onClick={(e)=> {e.preventDefault(); setEditFlag(false);}}>취소</button></div>
    </RepleUploadDiv> : <p>{props.reple.reple}</p>}
            
            </RepleContentDiv>
      </div>
  )
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  

export default RepleContent