import { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";
import { MyHeading } from "../../components/root/MyHeading.jsx";

export function BoardAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  console.log(files);

  const handleSaveClick = () => {
    setProgress(true);

    axios
      .postForm("/api/board/add", {
        title,
        content,
        files,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;

        toaster.create({
          description: message.text,
          type: message.type,
        });

        navigate(`/view/${data.data.id}`);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
      })
      .finally(() => {
        // 성공 / 실패 상관 없이 실행
        setProgress(false);
      });
  };
  const disabled = !(title.trim().length > 0 && content.trim().length > 0);

  // files 의 파일명을 component 리스트로 만들기
  const filesList = [];
  //파일용량
  let sumOfFileSize = 0;
  let invalidOneFileSize = false; //한 파일이라도 1mb 를 넘는지 판단

  for (const file of files) {
    sumOfFileSize += file.size;
    if (file.size > 1024 * 1024) {
      invalidOneFileSize = true;
    }
    filesList.push(
      <Card.Root size={"sm"}>
        <Card.Body>
          <HStack>
            <Text
              css={{ color: file.size > 1024 * 1024 ? "red" : "black" }}
              fontWeight={"bold"}
              me={"auto"}
              truncate
            >
              {file.name}
            </Text>
            <Text>{Math.floor(file.size / 1024)} KB</Text>
          </HStack>
        </Card.Body>
      </Card.Root>,
    );
  }
  //파일용량체크
  let fileInputInvalid = false;
  if (sumOfFileSize > 10 * 1024 * 1024 || invalidOneFileSize) {
    fileInputInvalid = true;
  }

  return (
    <Box mx={"auto"} w={{ md: "500px" }}>
      <MyHeading>게시물 작성</MyHeading>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label={"본문"}>
          <Textarea
            h={250}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>

        <Field
          label={"파일"}
          helperText={"총 10MB, 한파일은 1MB 이내로 선택하세요."}
          invalid={fileInputInvalid}
          errorText={"파일의 용량이 초과되었습니다."}
        >
          <Box>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type={"file"}
              accept={"image/*"}
              multiple
            />
            <Box>{filesList}</Box>
          </Box>
        </Field>

        <Box>
          <Button
            disabled={disabled}
            loading={progress}
            onClick={handleSaveClick}
          >
            저장
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
