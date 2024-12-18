package com.example.backend.dto.board;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Board {
    private Integer id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime inserted;

    private Integer countComment;
    private Integer countFile;
    private Integer countLike;

    //파일목록
    private List<BoardFile> fileList;
}
