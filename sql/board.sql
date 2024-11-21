use prj20241114;
#게ㅣ물 테이블 작성
CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(300)  NOT NULL,
    content  VARCHAR(5000) NOT NULL,
    writer   VARCHAR(20)   NOT NULL REFERENCES member (id),
    inserted DATETIME DEFAULT NOW()
);

SELECT *
FROM board;

DESC board;

#페이징 연습용 복붙
INSERT INTO board
    (title, content, writer)
SELECT title, content, writer
FROM board;

SELECT COUNT(*)
FROM board;