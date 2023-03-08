create table account_info(
    CID varchar(10),
    gmail varchar(25) UNIQUE,
    username varchar(25),
    password varchar(25),
    primary key (CID)
);

create table empty_CID
(
    CID varchar(10) UNIQUE,
    foreign key(CID) REFERENCES account_info(CID)
);

create table user_info(
    CID varchar(10) UNIQUE,
    foreign key(CID) REFERENCES account_info(CID)
);

create table admin_info(
    CID varchar(10) UNIQUE,
    foreign key(CID) REFERENCES account_info(CID)
);

create table tourist_attraction(
    TID varchar(10),
    description_path varchar(40),
    likes int,
    primary key(TID)
);

create table storage(
    CID varchar(10),
    TID varchar(10),
    foreign key(CID) REFERENCES user_info(CID),
    foreign key(TID) REFERENCES tourist_attraction(TID)
);

create table bonus(
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
    SELECT COUNT(TID) INTO TourCount FROM Tourist_attraction;
    ID := concat('TID', GenerateID(TourCount + 1));
    return ID;
END
$ID$LANGUAGE plpgsql;    

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

CREATE OR REPLACE PROCEDURE inserTourist(description_path varchar, likes int)
LANGUAGE plpgsql
AS $$
    DECLARE tidCount INT;
BEGIN
    INSERT INTO tourist_attraction(tid, description_path, likes)
    VALUES(Generatetouristid(), description_path, likes);
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


select *from account_info;
select *from user_info;
select *from admin_info; 
select *from tourist_attraction;
select *from bonus ;
select *from storage;
select *from empty_CID;

