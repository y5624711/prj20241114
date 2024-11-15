import { Box, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useState } from "react";
import axios from "axios";

export function MemberSignup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  function handleSaveClick() {
    axios
      .post("/api/member/signup", { userId, password, description })
      .then((res) => {
        console.log("잘됨");
      })
      .catch((e) => {
        console.log("안됐을 때");
      })
      .finally(() => {
        console.log("실패 성공 상관없음");
      });
  }

  return (
    <Box>
      <h3>회원가입</h3>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Field>
        <Field label={"암호"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label={"자기소개"}>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Box>
          <Button>가입</Button>
        </Box>
      </Stack>
    </Box>
  );
}
