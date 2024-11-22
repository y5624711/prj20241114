import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";

export function CommentInput({ boardId, onSaveClick }) {
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useContext(AuthenticationContext);

  const handleSaveClick = () => {
    onSaveClick(comment);
    setComment("");
  };

  return (
    <Box>
      <Group h={125} attached w={"100%"}>
        <Textarea
          h={125}
          flex={1}
          style={{ width: "900px", resize: "none" }}
          value={comment}
          disabled={!isAuthenticated}
          placeholder={
            isAuthenticated
              ? "댓글을 남겨주세요."
              : "로그인 후 댓글을 남겨주세요."
          }
          onChange={(e) => setComment(e.target.value)}
        />
        <Button h={125} disabled={!isAuthenticated} onClick={handleSaveClick}>
          댓글 쓰기
        </Button>
      </Group>
    </Box>
  );
}
