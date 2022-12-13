import React, { useState, useEffect } from "react";
import List from "./Post/List.js";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { GNBDiv, FooterDiv } from "../Style/MainPageCSS.js";

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...PostList, ...response.data.postList]);
          setSkip(Skip + response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 0) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <div>
      <GNBDiv>
        <div className="search">
          <input
            type="text"
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(event) => {
              let key = event.key || event.keyCode;
              if (key === 'Enter' || key === 13) SearchHandler();
            }}
            placeholder="제목+내용 검색"
          />
          <button onClick={() => SearchHandler()}>
          <svg xmlns="http://www.w3.org/2000/svg" color='#5FCC29' width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </button>
        </div>

        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("인기순")}>
            인기순
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <List PostList={PostList} />
      {LoadMore && (
        <FooterDiv>
          <button
            style={{ marginBottom: "10vh", border: ' solid #5FCC29'}}
            onClick={() => getLoadMore()}
          >
            더 불러오기
          </button>
        </FooterDiv>
      )}
    </div>
  );
}

export default MainPage;
