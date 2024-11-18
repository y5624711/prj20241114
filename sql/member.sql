use prj20241114;

CREATE TABLE member
(
    id          VARCHAR(20) PRIMARY KEY,
    password    VARCHAR(30) NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);

DROP TABLE member;

SELECT *
FROM member;

ALTER TABLE member
    ADD COLUMN email VARCHAR(20) UNIQUE AFTER id;

