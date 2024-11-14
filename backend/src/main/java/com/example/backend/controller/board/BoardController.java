package com.example.backend.controller.board;

import com.example.backend.dto.board.Board;
import com.example.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;

    @PostMapping("add")
    public void add(@RequestBody Board board) {
        service.add(board);
    }

    @GetMapping("list")
    public List<Board> list() {
        return service.list();
    }
}
