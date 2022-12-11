import React, {useState, useEffect} from 'react'
import { LoginDiv } from '../../Style/UserCSS'
import { useSelector } from "react-redux";
import firebase from '../../firebase';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false); // 회원가입 버튼 눌렀을 때 로딩 중에 버튼을 여러번 누르는 것을 방지
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  //로그인 한 상태에서 회원가입 페이지 못 들어옴
  useEffect(() => {
    if (user.accessToken) {
      navigate(-1);
    }
  }, [user]);
  
  
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    } 
    if (PW != PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    if(!NameCheck) {
      return alert("닉네임 중복 검사를 진행해주세요.");
    }
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name
    });
    
    console.log(createdUser.user);

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid
    };
    axios.post("/api/user/register", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        //회원가입 성공
        navigate("/login");

      } else {
         //회원가입 실패
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if(!Name) {
      return alert("닉네임을 입력해주세요");
    }
    let body = {
      displayName: Name
    };
    axios.post("/api/user/nameCheck", body).then((response) => {
      if(response.data.success) {
        if(response.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else
        setNameInfo("사용불가능한 닉네임입니다.");
      }
    })
  }


  return (
    <>
    <LoginDiv style={{display: 'flex', justifyContent : 'center'}}>
      <form>
        <label>닉네임</label>
        <input type="name" value={Name} disabled= {NameCheck} onChange={(e) => setName(e.currentTarget.value)}/>
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
        <label>이메일</label>
        <input type="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}/>
        <label>비밀번호</label>
        <input type="password" value={PW} minlegth={8} onChange={(e) => setPW(e.currentTarget.value)}/>
        <label>비밀번호 확인</label>
        <input type="password" value={PWConfirm} minlegth={8} onChange={(e) => setPWConfirm(e.currentTarget.value)}/>
        <button disabled={Flag} onClick={(e)=>RegisterFunc(e)}>회원가입</button>
      </form> 
    </LoginDiv>
    <br/><br/><br/><br/>
    </>
    
  )
}

export default Register