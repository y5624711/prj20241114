import { Box, HStack, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import { MyHeading } from "../../components/root/MyHeading.jsx";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { hasAccess, isAdmin, logout } = useContext(AuthenticationContext);

  useEffect(() => {
    //회원정보 얻기
    axios.get(`/api/member/${id}`).then((res) => setMember(res.data));
  }, []);

  if (!member) {
    return <Spinner />;
  }

  const showButton = hasAccess(id) || isAdmin;

  function handleDeleteClick() {
    axios
      .delete("/api/member/remove", {
        data: { id: id, password: password },
      })
      .then((res) => {
        logout();
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate("/member/login");
      })
      .catch((e) => {
        const message = e.response.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setOpen(false);
        setPassword("");
      });
  }

  return (
    <Box
      mx={"auto"}
      w={{
        md: "500px",
      }}
    >
      <MyHeading>회원 정보</MyHeading>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Input readOnly value={member.id} attached />
        </Field>
        <Field label={"이메일"}>
          <Input readOnly value={member.email} attached />
        </Field>
        <Field label={"암호"}>
          <Input readOnly value={member.password} />
        </Field>
        <Field label={"자기소개"}>
          <Textarea h={125} readOnly value={member.description} />
        </Field>
        <Field label={"가입일"}>
          <Input type={"datetime-local"} readOnly value={member.inserted} />
        </Field>
        {showButton && (
          <HStack>
            <Button onClick={() => navigate(`/member/edit/${id}`)}>수정</Button>
            <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
              <DialogTrigger asChild>
                <Button colorPalette={"red"}>탈퇴</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>탈퇴 확인</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack gap={5}>
                    <Field label={"암호"}>
                      <Input
                        placeholder={"암호를 입력해 주세요"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Input>
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette={"red"} onClick={handleDeleteClick}>
                    탈퇴
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </HStack>
        )}
      </Stack>
    </Box>
  );
}
