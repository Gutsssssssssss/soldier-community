import styled from "@emotion/styled";

const LoginDiv = styled.div`
  width: 50%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: 5rem;
  form {
    width: 70%;
    padding: 20px;
    border:  solid #5FCC29;
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 10px;
      border: solid #5FCC29;
      padding: 5px;
      margin-bottom: 10px;

      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: #5FCC29;
      color: white;
      border: 1px solid #5FCC29;
      margin-top: 10px;
      &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
      }
    }
    @media (max-width: 756px) {
      width: 100%;
    }
  }
  @media (max-width: 756px) {
    width: 90%;
    margin-top: 3rem;
  }
`;

export { LoginDiv };
