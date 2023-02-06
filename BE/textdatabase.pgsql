-- create table account_info(
--     gmail varchar(25),
--     username varchar(25),
--     password varchar(25),
--     primary key (gmail)
-- );

-- create table user_info(
--     gmail varchar(25),
--     primary key (gmail),
--     foreign key(gmail) REFERENCES account_info(gmail)
-- );

-- create table admin_info(
--     gmail varchar(25),
--     primary key (gmail),
--     foreign key(gmail) REFERENCES account_info(gmail)
-- )

-- create table tourist_attraction(
--     tid varchar(10),
--     longtitude int,
--     latitude int,
--     description_path varchar(30),
--     likes int,
--     primary key(tid)
-- );

-- create table storage(
--     gmail varchar(25),
--     tid varchar(10),
--     primary key(tid),
--     foreign key(gmail) REFERENCES user_info(gmail),
--     foreign key(tid) REFERENCES tourist_attraction(tid)
-- );

-- create table bonus(
--     gmail varchar(25),
--     comment text,
--     foreign key(gmail) REFERENCES user_info(gmail)
-- );

-- drop table user_info;
-- drop table admin_info;
-- drop table account_info;
-- select *from account_info;
-- select *from user_info;
-- select *from admin_info;
-- select *from tourist_attraction;
-- select *from bonus ;
-- select *from storage;

-- CREATE OR REPLACE FUNCTION GenerateID(ID INT)
-- RETURNS VARCHAR AS $tempStr$
-- DECLARE RS VARCHAR;

-- DECLARE tempStr VARCHAR;
-- DECLARE Count INT;
-- BEGIN
--     tempStr := ID :: VARCHAR;
--     Count := length(tempStr);
--     WHILE Count < 3 loop
--         tempStr := concat('0', tempStr);
--         Count := Count + 1;
--     end loop;
--     RETURN tempStr;
-- END;
-- $tempStr$LANGUAGE plpgsql;  

-- CREATE OR REPLACE FUNCTION GenerateTouristID()
-- RETURNS VARCHAR AS $ID$
-- DECLARE ID VARCHAR;
-- DECLARE TourCount INT;
-- BEGIN
--     SELECT COUNT(TID) INTO TourCount FROM Tourist_attraction;
--     ID := concat('TID', GenerateID(TourCount + 1));
--     return ID;
-- END
-- $ID$LANGUAGE plpgsql;    

-- CREATE OR REPLACE PROCEDURE inserTourist(longtitude int, latitude int, description_path varchar, likes int)
-- LANGUAGE plpgsql
-- AS $$
--     DECLARE tidCount INT;
-- BEGIN
--     SELECT COUNT(tid) INTO tidCount FROM tourist_attraction;
--     INSERT INTO tourist_attraction(tid, longtitude, latitude, description_path, likes)
--     VALUES(Generatetouristid(), longtitude, latitude, description_path, likes);
-- END;
-- $$;

-- create or replace PROCEDURE insertAccount(gmail varchar, fullname varchar, password varchar)
-- LANGUAGE plpgsql
-- AS $$
--     BEGIN
--         IF 
--         INSERT INTO account_info(gmail, fullname, password)
--         VALUES(gmail, fullname, password);

--         INSERT INTO user_info(gmail, password)
--         VALUES(gmail, password);
--     END;
-- $$;

-- create or replace PROCEDURE insertAdmin(gmail varchar, fullname varchar, password varchar)
-- LANGUAGE plpgsql
-- AS $$
--     BEGIN
--         INSERT INTO account_info(gmail, fullname, password)
--         VALUES(gmail, fullname, password);

--         INSERT INTO admin_info(gmail, password)
--         VALUES(gmail, password);
--     END;
-- $$;

-- create or replace PROCEDURE insertBonus(gmail varchar, comment text)
-- LANGUAGE plpgsql
-- AS $$
--     BEGIN
--         INSERT INTO bonus(gmail, comment)
--         VALUES(gmail, comment);
--     END;
-- $$;