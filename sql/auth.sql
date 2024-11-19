use prj20241114;

CREATE TABLE auth
(
    member_id VARCHAR(20) REFERENCES member (id),
    auth_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (member_id, auth_name)
);

#
INSERT INTO auth(member_id, auth_name)
VALUES ('trump', 'admin');

#
INSERT INTO auth(member_id, auth_name)
VALUES ('trump', 'manager');


DESC member;