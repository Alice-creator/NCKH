create database nckh;

select * from attractions, viet_introduction, user_storage
where attractions.tid = viet_introduction.tid and user_storage.cid = 'CID002'
and user_storage.tid = viet_introduction.tid;


SELECT tid
FROM viet_introduction
WHERE viet_introduction.tid not in ( select viet_introduction.tid from attractions, viet_introduction, user_storage
where attractions.tid = viet_introduction.tid and user_storage.cid = 'CID002'
and user_storage.tid = viet_introduction.tid
);