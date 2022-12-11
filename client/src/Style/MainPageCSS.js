import styled from "@emotion/styled";

const GNBDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  .search {
    display: grid;
    min-width: 40%;
    grid-template-columns: 8fr 2fr;
    grid-template-rows: auto;

    input {
      padding: 5px 20px;
      border-radius: 15px 0px 0px 15px;
      border: solid #000080;
      color: #000080;
      height: 100%;
      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: white;
      height: 100%;
      border-top: solid #000080;
      border-bottom: solid #000080;
      border-left: 0.5px solid #000080;
      border-radius: 0px 15px 15px 0px;
      margin-bottom: -1px;
    }
  }

  @media (max-width: 756px) {
    width: 90%;
    .search {
      width: auto;
      input {
        padding: 5px 10px;
        width: 100%;
      }
    }
    .btn {
      font-size: 0.75rem;
      margin-left: 1rem;
    }
  }
`;

const FooterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    background-color: white;
    width: auto;
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
  }
`;

export { GNBDiv, FooterDiv };
