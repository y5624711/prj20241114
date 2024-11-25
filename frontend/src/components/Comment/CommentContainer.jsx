import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { CommentInput } from "./CommentInput.jsx";
import { CommentList } from "./CommentList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";
import { MyHeading } from "../root/MyHeading.jsx";
import { FaCommentDots } from "react-icons/fa6";

export function CommentContainer({ boardId }) {
  const [commentList, setCommentList] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!processing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => res.data)
        .then((data) => setCommentList(data));
    }
  }, [processing]);

  function handleSaveClick(comment) {
    setProcessing(true);
    axios
      .post("/api/comment/add", {
        boardId: boardId,
        comment: comment,
      })
      .then((res) => res.data.message)
      .then((message) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function handleDeleteClick(id) {
    setProcessing(true);
    axios.delete(`/api/comment/remove/${id}`).finally(() => {
      setProcessing(false);
    });
  }

  function handleEditClick(id, comment) {
    setProcessing(true);

    axios
      .put(`/api/comment/edit`, { id, comment })
      .then((res) => res.data.message)
      .then((message) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <Box my={10}>
      <Stack>
        <HStack>
          <MyHeading>댓글</MyHeading>
          <Text mb={7} fontSize={"lx"}>
            <Icon>
              <FaCommentDots />
            </Icon>
          </Text>
          <Text mb={7} fontSize={"xl"}>
            {commentList.length}
          </Text>
        </HStack>
        <CommentInput boardId={boardId} onSaveClick={handleSaveClick} />
        <CommentList
          boardId={boardId}
          commentList={commentList}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </Stack>
    </Box>
  );
}
