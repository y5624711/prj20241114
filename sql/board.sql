use prj20241114;
#게ㅣ물 테이블 작성
CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(300)  NOT NULL,
    content  VARCHAR(5000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME DEFAULT NOW()
);

SELECT *
FROM board;