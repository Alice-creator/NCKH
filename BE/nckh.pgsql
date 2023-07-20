create table account_info(
    CID varchar(10),
    gmail varchar(25) UNIQUE,
    username varchar(25),
    password varchar(100),
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
    name varchar(100),
    type varchar(100),
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
    name varchar(100) DEFAULT NULL,
    latitude float DEFAULT NULL,
    longitude float DEFAULT NULL,
    timezone varchar(100) DEFAULT NULL,
    location_string varchar(100) DEFAULT NULL,
    images varchar(200) DEFAULT NULL,
    address varchar(100) DEFAULT NULL,
    description text DEFAULT NULL,
    story text DEFAULT NULL,
    attribute text DEFAULT NULL,
    foreign key(TID) REFERENCES attractions(TID)
);

create table eng_introduction(
    TID varchar(10),
    index int,
    name varchar(100) DEFAULT NULL,
    latitude float DEFAULT NULL,
    longitude float DEFAULT NULL,
    timezone varchar(100) DEFAULT NULL,
    location_string varchar(100) DEFAULT NULL,
    images varchar(200) DEFAULT NULL,
    address varchar(100) DEFAULT NULL,
    description text DEFAULT NULL,
    story text DEFAULT NULL,
    attribute text DEFAULT NULL,
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

create table analyse_info(
    TID varchar(10),
    CID varchar(10),
    searchs int DEFAULT 0,
    likes int DEFAULT 0,
    FOREIGN key(TID) REFERENCES attractions(TID),
    FOREIGN key(CID) REFERENCES account_info(CID)
);

create table User_content_based(
    CID varchar(10),
    TID varchar(10),
    score float,
    FOREIGN KEY(CID) REFERENCES account_info(CID),
    FOREIGN KEY(TID) REFERENCES attractions(TID)
);

create table Colaborative_filtering(
    TID1 varchar(10),
    TID2 varchar(10),
    score float,
    FOREIGN KEY(TID1) REFERENCES attractions(TID),
    FOREIGN KEY(TID2) REFERENCES attractions(TID)
);

create table Tour(
    TID varchar(10),
    travelOrder int,
    FOREIGN KEY(TID) REFERENCES attractions(TID)
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

CREATE OR REPLACE PROCEDURE insertIntro_Viet(name varchar, latitude float, longitude float, timezone varchar, location_string varchar, img varchar, address varchar, description text, story text, attribute text)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM viet_introduction;
    INSERT INTO viet_introduction(tid, index, name, latitude, longitude, timezone, location_string, images, address, description, story, attribute)
    VALUES(GenerateIntroIDViet(), TIndex, name, latitude, longitude, timezone, location_string, img, address, description, story, attribute);
END;
$$;

CREATE OR REPLACE PROCEDURE insertIntro_Eng(name varchar, latitude float, longitude float, timezone varchar, location_string varchar, img varchar, address varchar, description text, story text, attribute text)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM eng_introduction;
    INSERT INTO eng_introduction(tid, index, name, latitude, longitude, timezone, location_string, images, address, description, story, attribute)
    VALUES(GenerateIntroIDEng(), TIndex, name, latitude, longitude, timezone, location_string, img, address, description, story, attribute);
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
    DECLARE tidCount varchar;
    DECLARE TIndex INT;
BEGIN
    SELECT COUNT(*) INTO TIndex FROM attractions;
    tidCount = Generatetouristid();
    INSERT INTO attractions(tid, index, name, type, likes)
    VALUES(tidCount, TIndex, name, type, likes);
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
values('CID001','admin@gmail.com', 'admin', '63640264849a87c90356129d99ea165e37aa5fabc1fea46906df1a7ca50db492');

insert into admin_info(cid)
values('CID001');

insert into account_info(cid, gmail, username, password)
values('CID000','user@gmail.com', 'user', '63640264849a87c90356129d99ea165e37aa5fabc1fea46906df1a7ca50db492');

insert into admin_info(cid)
values('CID000');

-- call insertaccount('user1@gmail.com', 'Anna', '12345');
-- call insertaccount('', '', '');
-- call insertaccount('user2@gmail.com', 'An', '1234567');
-- call insertaccount('user3@gmail.com', 'Thanh', '12345678');

select * from user_info;
select * from admin_info;
select * from user_storage;
select * from account_info;
select * from analyse_info;
select * from comments;
select * from attractions;
select * from user_post_image;
SELECT * from viet_introduction;
SELECT * from eng_introduction;
SELECT * from User_content_based;
SELECT * FROm Colaborative_filtering;
select * from Tour;