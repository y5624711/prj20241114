import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export function BoardEdit() {
  const { id } = useParams();
  return (
    <Box>
      <h3>{id}번 게시물 수정</h3>
    </Box>
  );
}
