package com.example.backend.dto.comment;

import lombok.Data;

@Data
public class Comment {
    private String boardId;
    private String memberId;
    private String comment;
}
