import { Box, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    //회원목록
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  if (!memberList || memberList.length === 0) {
    return <Spinner />;
  }

  return (
    <Box>
      <h3>회원 목록</h3>
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>가입일시</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.map((member) => (
            <Table.Row key={member.id}>
              <Table.Cell>{member.id}</Table.Cell>
              <Table.Cell>{member.inserted}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
