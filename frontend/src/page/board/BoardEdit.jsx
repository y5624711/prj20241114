import { Box, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
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

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    axios.get(`/api/board/view/${id}`).then((res) => setBoard(res.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  const handleSaveClick = () => {
    setProgress(true);
    axios.put("/api/board/update", board).finally(() => {
      setProgress(false);
    });
  };

  return (
    <Box>
      <h3>{id}번 게시물 수정</h3>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input
            value={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </Field>
        <Field label={"본문"}>
          <Textarea
            value={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </Field>

        <DialogRoot>
          <DialogTrigger asChild>
            <Button colorPalette={"cyan"} variant={"outline"}>
              저장
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>저장 확인</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>{board.id}번 게시물을 수정하시겠습니까?</p>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger>
                <Button variant={"outline"}>취소</Button>
              </DialogActionTrigger>
              <Button
                loading={progress}
                colorPalette={"blue"}
                onClick={handleSaveClick}
              >
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
    </Box>
  );
}
