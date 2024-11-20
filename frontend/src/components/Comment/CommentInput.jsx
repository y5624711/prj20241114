import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useState } from "react";

export function CommentInput({ boardId, onSaveClick }) {
  const [comment, setComment] = useState("");

  const handleSaveClick = () => {
    if (comment.trim() === "") {
      return;
    }
    onSaveClick(comment);
    setComment("");
  };

  return (
    <Box>
      <Group>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleSaveClick}>댓글 쓰기</Button>
      </Group>
    </Box>
  );
}
