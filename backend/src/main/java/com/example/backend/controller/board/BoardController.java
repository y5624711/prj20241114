package com.example.backend.controller.board;

import com.example.backend.dto.board.Board;
import com.example.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Board board) {
        if (service.add(board)) {
            return ResponseEntity.ok()
                    .body(Map.of("message",
                            Map.of("type", "success", "text",
                                    board.getId() + "번 게시믈이 등록되었습니다."),
                            "data", board));
        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message",
                            Map.of("type", "warning", "text", "게시물 등록이 실패하였습니다.")));
        }
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
