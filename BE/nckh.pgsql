create table account_info(
    CID varchar(10),
    gmail varchar(25) UNIQUE,
    username varchar(25),
    password varchar(25),
    primary key (CID)
);

create table user_info(
    CID varchar(10) UNIQUE,
    foreign key(CID) REFERENCES account_info(CID)
);

create table admin_info(
    CID varchar(10) UNIQUE,
    foreign key(CID) REFERENCES account_info(CID)
);

create table attractions(
    TID varchar(10),
    index int,
    name varchar(40),
    type varchar(20),
    likes int,
    primary key(TID)
);

create table user_storage(
    CID varchar(10),
    TID varchar(10),
    foreign key(CID) REFERENCES user_info(CID),
    foreign key(TID) REFERENCES attractions(TID)
);

create table viet_introduction(
    TID varchar(10),
    index int,
    name varchar(30) DEFAULT NULL,
    latitude varchar(30) DEFAULT NULL,
    longitude varchar(30) DEFAULT NULL,
    timezone varchar(30) DEFAULT NULL,
    location_string varchar(100) DEFAULT NULL,
    images varchar(200) DEFAULT NULL,
    address varchar(100) DEFAULT NULL,
    description text DEFAULT NULL,
    story text DEFAULT NULL,
    foreign key(TID) REFERENCES attractions(TID)
);

create table eng_introduction(
    TID varchar(10),
    index int,
    name varchar(30) DEFAULT NULL,
    latitude varchar(30) DEFAULT NULL,
    longitude varchar(30) DEFAULT NULL,
    timezone varchar(30) DEFAULT NULL,
    location_string varchar(100) DEFAULT NULL,
    images varchar(200) DEFAULT NULL,
    address varchar(100) DEFAULT NULL,
    description text DEFAULT NULL,
    story text DEFAULT NULL,
    foreign key(TID) REFERENCES attractions(TID)
);

create table user_post_image
(
    CID varchar(10) UNIQUE,
    image_path varchar(100) DEFAULT NULL,
    foreign key(CID) REFERENCES account_info(CID)
);

create table comments(
    CID varchar(10),
    comment text,
    foreign key(CID) REFERENCES user_info(CID)
);

CREATE OR REPLACE FUNCTION GenerateID(ID INT)
RETURNS VARCHAR AS $tempStr$

DECLARE RS VARCHAR;
DECLARE tempStr VARCHAR;
DECLARE Count INT;
BEGIN
    tempStr := ID :: VARCHAR;
    Count := length(tempStr);
    WHILE Count < 3 loop
        tempStr := concat('0', tempStr);
        Count := Count + 1;
    end loop;
    RETURN tempStr;
END;
$tempStr$LANGUAGE plpgsql;  

CREATE OR REPLACE FUNCTION GenerateTouristID()
RETURNS VARCHAR AS $ID$
DECLARE ID VARCHAR;
DECLARE TourCount INT;
BEGIN
    SELECT COUNT(TID) INTO TourCount FROM attractions;
    ID := concat('TID', GenerateID(TourCount + 1));
    return ID;
END
$ID$LANGUAGE plpgsql;    

CREATE OR REPLACE FUNCTION GenerateIntroIDViet()
RETURNS VARCHAR AS $ID$
DECLARE ID VARCHAR;
DECLARE TourCount INT;
BEGIN
    SELECT COUNT(TID) INTO TourCount FROM viet_introduction;
    ID := concat('TID', GenerateID(TourCount + 1));
    return ID;
END
$ID$LANGUAGE plpgsql; 

CREATE OR REPLACE FUNCTION GenerateIntroIDEng()
RETURNS VARCHAR AS $ID$
DECLARE ID VARCHAR;
DECLARE TourCount INT;
BEGIN
    SELECT COUNT(TID) INTO TourCount FROM eng_introduction;
    ID := concat('TID', GenerateID(TourCount + 1));
    return ID;
END
$ID$LANGUAGE plpgsql; 

CREATE OR REPLACE PROCEDURE insertIntro_Viet(name varchar, latitude varchar, longitude varchar, timezone varchar, location_string varchar, img varchar, address varchar, description text, story text)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM viet_introduction;
    INSERT INTO viet_introduction(tid, index, name, latitude, longitude, timezone, location_string, images, address, description, story)
    VALUES(GenerateIntroIDViet(), TIndex, name, latitude, longitude, timezone, location_string, img, address, description, story);
END;
$$;

CREATE OR REPLACE PROCEDURE insertIntro_Eng(name varchar, latitude varchar, longitude varchar, timezone varchar, location_string varchar, img varchar, address varchar, description text, story text)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM eng_introduction;
    INSERT INTO eng_introduction(tid, index, name, latitude, longitude, timezone, location_string, images, address, description, story)
    VALUES(GenerateIntroIDEng(), TIndex, name, latitude, longitude, timezone, location_string, img, address, description, story);
END;
$$;

CREATE OR REPLACE FUNCTION GenerateCID()
RETURNS VARCHAR AS $ID$
DECLARE ID VARCHAR;
DECLARE CCount INT;
BEGIN
    SELECT COUNT(CID) INTO CCount FROM account_info;
    ID := concat('CID', GenerateID(CCount + 1));
    return ID;
END
$ID$LANGUAGE plpgsql;   

CREATE OR REPLACE PROCEDURE inserTourist(name varchar, type varchar, likes int)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM attractions;
    INSERT INTO attractions(tid, index, name, type, likes)
    VALUES(Generatetouristid(), TIndex, name, type, likes);
END;
$$;

create or replace PROCEDURE insertAccount(gmail varchar, fullname varchar, password varchar)
LANGUAGE plpgsql
AS $$
        DECLARE CID VARCHAR;
    BEGIN
        CID = generatecid();
        INSERT INTO account_info(CID, gmail, username, password)
        VALUES(CID,gmail, fullname, password);

        INSERT INTO user_info(cid)
        VALUES(CID);

        INSERT INTO user_post_image(CID)
        VALUES(CID);
    END;
$$;

insert into account_info(cid, gmail, username, password)
values('CID001','admin@gmail.com', 'admin', '12345678910');

insert into admin_info(cid)
values('CID001');

call insertaccount('user1@gmail.com', 'Anna', '12345');
call insertaccount('', '', '');
call insertaccount('user2@gmail.com', 'An', '1234567');
call insertaccount('user3@gmail.com', 'Thanh', '12345678');

select * from user_info;
select * from admin_info;
select * from user_storage;
select * from account_info;
select * from comments;
select * from attractions;
select * from user_post_image;
SELECT * from viet_introduction;
SELECT * from eng_introduction;