package com.example.backend.service.board;

import com.example.backend.dto.board.Board;
import com.example.backend.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    final BoardMapper mapper;

    public boolean add(Board board) {
        int cnt = mapper.insert(board);

        return cnt == 1;
    }

    public Map<String, Object> list(Integer page, String searchType, String keyword) {
        //SQL의 LIMIT 키워드에서 사용되는 offset
        Integer offset = (page - 1) * 10;
        //조회되는 게시물들
        List<Board> list = mapper.selectPage(offset, searchType, keyword);
        //전체 게시물 수
        Integer count = mapper.countAll();

        return Map.of("list", list, "count", mapper.countAll());
    }

    public Board get(int id) {
        return mapper.selectById(id);
    }

    //내용이 입력되었는지 확인
    public boolean validate(Board board) {
        boolean title = board.getTitle().trim().length() > 0;
        boolean content = board.getContent().trim().length() > 0;
        return title && content;
    }

    public boolean remove(int id) {
        int cnt = mapper.deleteById(id);
        return cnt == 1;
    }

    public boolean update(Board board) {
        int cnt = mapper.update(board);
        return cnt == 1;
    }
}
