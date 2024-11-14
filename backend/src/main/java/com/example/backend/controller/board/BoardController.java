package com.example.backend.controller.board;

import com.example.backend.dto.board.Board;
import com.example.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;

    @PostMapping("add")
    public Map<String, Object> add(@RequestBody Board board) {
        return service.add(board);
    }

    @GetMapping("list")
    public List<Board> list() {
        return service.list();
    }

    @GetMapping("view/{id}")
    public Board view(@PathVariable int id) {
        return service.get(id);
    }
}
