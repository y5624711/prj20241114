import { useNavigate } from "react-router-dom";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";
import { HiOutlinePencilSquare, HiOutlineUserPlus } from "react-icons/hi2";
import { PiAddressBookTabsThin } from "react-icons/pi";
import { CiLogin, CiLogout, CiUser } from "react-icons/ci";

function NavbarItem({ children, ...rest }) {
  return (
    <Box
      css={{
        paddingX: "15px",
        paddingY: "10px",
      }}
      _hover={{
        bgColor: "gray.300",
        cursor: "pointer",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function Navbar() {
  const navigate = useNavigate();

  // step 2 : context 사용하기
  const { id, isAdmin, isAuthenticated, logout } = useContext(
    AuthenticationContext,
  );

  return (
    <Flex gap={3} mb={10}>
      <NavbarItem onClick={() => navigate("/")}>HOME</NavbarItem>
      {isAuthenticated && (
        <NavbarItem onClick={() => navigate("/add")}>
          <Icon hideFrom={"sm"}>
            <HiOutlinePencilSquare />
          </Icon>
          <Text hideBelow={"sm"}>작성</Text>
        </NavbarItem>
      )}
      <Box mx={"auto"}></Box>
      {isAuthenticated || (
        <NavbarItem onClick={() => navigate("/member/signup")}>
          <Icon hideFrom={"sm"}>
            <HiOutlineUserPlus />
          </Icon>
          <Text hideBelow={"sm"}>가입</Text>
        </NavbarItem>
      )}
      {isAdmin && (
        <NavbarItem onClick={() => navigate("/member/list")}>
          <Icon hideFrom={"sm"}>
            <PiAddressBookTabsThin />
          </Icon>
          <Text hideBelow={"sm"}>회원목록</Text>
        </NavbarItem>
      )}

      {isAuthenticated || (
        <NavbarItem onClick={() => navigate("/member/login")}>
          <Icon hideFrom={"sm"}>
            <CiLogin />
          </Icon>
          <Text hideBelow={"sm"}>로그인</Text>
        </NavbarItem>
      )}
      {isAuthenticated && (
        <NavbarItem
          onClick={() => {
            logout();
            navigate("/member/login");
          }}
        >
          <Icon hideFrom={"sm"}>
            <CiLogout />
          </Icon>
          <Text hideBelow={"sm"}>로그아웃</Text>
        </NavbarItem>
      )}
      {isAuthenticated && (
        <NavbarItem onClick={() => navigate(`/member/${id}`)}>
          <Icon hideFrom={"sm"}>
            <CiUser />
          </Icon>

          <Text hideBelow={"sm"}>{id}</Text>
        </NavbarItem>
      )}
    </Flex>
  );
}
