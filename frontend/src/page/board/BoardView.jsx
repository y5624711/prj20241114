import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import { CommentContainer } from "../../components/comment/CommentContainer.jsx";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { ToggleTip } from "../../components/ui/toggle-tip.jsx";
import { MyHeading } from "../../components/root/MyHeading.jsx";

function ImageFileView({ files }) {
  return (
    <Box>
      {files.map((file) => (
        <Image
          key={file.name}
          src={file.src}
          my={3}
          border={"1px solid black"}
        />
      ))}
    </Box>
  );
}

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({ like: false, count: 0 });
  const [likeTooltipOpen, setLikeTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const { hasAccess, isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    axios.get(`/api/board/view/${id}`).then((res) => setBoard(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/board/like/${id}`)
      .then((res) => res.data)
      .then((data) => setLike(data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  const handleDeleteClick = () => {
    axios
      .delete(`/api/board/delete/${board.id}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/");
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  const handleLikeClick = () => {
    if (isAuthenticated) {
      axios
        .post("/api/board/like", {
          id: board.id,
        })
        .then((res) => res.data)
        .then((data) => setLike(data))
        .catch()
        .finally();
    } else {
      // tooltip 보여주기
      setLikeTooltipOpen(!likeTooltipOpen);
    }
  };

  return (
    <Box
      mx={"auto"}
      w={{
        md: "500px",
      }}
    >
      <Flex>
        <MyHeading me={"auto"}>{id} 번 게시물</MyHeading>
      </Flex>
      <Stack gap={5}>
        <Field label="제목" readOnly>
          <Input value={board.title} />
        </Field>
        <Field label="본문" readOnly>
          <Textarea h={250} value={board.content} />
        </Field>
        <ImageFileView files={board.fileList} />
        <Field label="작성자" readOnly>
          <Input value={board.writer} />
        </Field>
        <Field label="작성일시" readOnly>
          <Input value={board.inserted} type={"datetime-local"} />
        </Field>

        <HStack>
          <Box>
            <HStack>
              <Box onClick={handleLikeClick}>
                <ToggleTip
                  open={likeTooltipOpen}
                  content={"로그인 후 좋아요를 클릭해주세요."}
                >
                  <Heading>
                    {like.like || <GoHeart color={"red"} />}
                    {like.like && <GoHeartFill color={"red"} />}
                  </Heading>
                </ToggleTip>
              </Box>
              <Box>
                <Heading>{like.count}</Heading>
              </Box>
            </HStack>
          </Box>
          {hasAccess(board.writer) && (
            <HStack>
              <Box mr={300}></Box>
              <Button
                size={"sm"}
                colorPalette={"cyan"}
                onClick={() => navigate(`/edit/${board.id}`)}
              >
                수정
              </Button>
              <DialogRoot>
                <DialogTrigger asChild>
                  <Button size={"sm"} colorPalette={"red"}>
                    삭제
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>삭제 확인</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <p>{board.id}번 게시물을 삭제하시겠습니까?</p>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger>
                      <Button variant={"outline"}>취소</Button>
                    </DialogActionTrigger>
                    <Button colorPalette={"red"} onClick={handleDeleteClick}>
                      삭제
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogRoot>
            </HStack>
          )}
        </HStack>
      </Stack>
      <CommentContainer boardId={board.id} />
    </Box>
  );
}
