import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BordList() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((res) => res.data)
      .then((data) => setBoardList(data));
  }, []);

  return (
    <Box>
      <h3>게시물 목록</h3>
      {/* 게시물들을 테이블로*/}
      {boardList.map((board) => (
        <li>
          {board.title},{board.writer}
        </li>
      ))}
    </Box>
  );
}
