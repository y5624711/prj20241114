package com.example.backend.controller.board;

import com.example.backend.dto.board.Board;
import com.example.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Board board) {
        if (service.validate(board)) {

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
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "warning",
                    "text", "제목과 본문이 비어있을 수 없습니다.")));
        }
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "st", defaultValue = "all") String searchType,
                                    @RequestParam(value = "sk", defaultValue = "") String keyword) {
        System.out.println("searchType = " + searchType);
        System.out.println("keyword = " + keyword);

        return service.list(page);
    }

    @GetMapping("view/{id}")
    public Board view(@PathVariable int id) {
        return service.get(id);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int id) {
        if (service.remove(id)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", id + "번 게시글이 삭제되었습니다.")));
        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "게시글 삭제 중 문제가 발생하였습니다.")));
        }
    }

    @PutMapping("update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Board board) {
        if (service.validate(board)) {
            if (service.update(board)) {
                return ResponseEntity.ok()
                        .body(Map.of("message", Map.of("type", "success", "text",
                                board.getId() + "번 개시물이 수정되었습니다.")));

            } else {
                return ResponseEntity.internalServerError()
                        .body(Map.of("message", Map.of("type", "error", "text",
                                board.getId() + "번 개시물이 수정되지 않았습니다..")));
            }

        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "warning",
                    "text", "제목과 본문이 비어있을 수 없습니다.")));
        }
    }
}
