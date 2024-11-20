package com.example.backend.dto.comment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Comment {
    private String boardId;
    private String memberId;
    private String comment;
    private LocalDateTime inserted;
}
