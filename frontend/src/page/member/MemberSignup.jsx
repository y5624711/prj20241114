import { Box, Group, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useState } from "react";
import axios from "axios";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  function handleSaveClick() {
    axios
      .post("/api/member/signup", { id, password, description })
      .then((res) => {
        const message = res.data.message;
        console.log("잘됌");
        toaster.create({
          type: message.type,
          description: message.text,
        });

        //TODO: login으로 이동
        navigate("/");
      })
      .catch((e) => {
        console.log("안됐을 때");
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        console.log("실패 성공 상관없음");
      });
  }

  const handleIdCheckClick = () => {
    axios
      .get("/api/member/check", {
        params: {
          id: id,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log("아이디체크 결과");
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        setIdCheck(data.available);
      });
  };

  //가입버튼 비활성화 여부
  let disabled = true;
  if (idCheck) {
    if (password === passwordCheck) {
      disabled = !idCheck;
    }
  }

  return (
    <Box>
      <h3>회원가입</h3>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Group attached w={"40%"}>
            <Input
              value={id}
              onChange={(e) => {
                setIdCheck(false);
                setId(e.target.value);
              }}
            />
            <Button onClick={handleIdCheckClick} variant={"outline"}>
              중복확인
            </Button>
          </Group>
        </Field>
        <Field label={"암호"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label={"암호확인"}>
          <Input
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Field>
        <Field label={"자기소개"}>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Box>
          <Button disabled={disabled} onClick={handleSaveClick}>
            가입
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
