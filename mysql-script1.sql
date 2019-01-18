select * from crm.token;
update crm.token set token='test-token123' where userid='123';
commit;

select * from crm.user;

truncate table crm.user;
truncate table crm.token;

select * from crm.user;
select * from  crm.token;

insert into crm.user values('123','db1788');
insert into crm.user values('124','user1');

select * from crm.token;

drop table user;

create table crm.user (
userid varchar(9),
username varchar(30),
password varchar(50)
);

grant all on user to webuser;

select * from user;



select * from crm.token;

truncate table crm.user;
truncate table crm.token;

create table crm.projects(
name varchar(50),
status varchar(20),
bids decimal(8),
budget decimal(10),
release_dt date


);

select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects;

select name,status,bids, budget, date_format(release_dt,'%Y-%m-%d') from crm.projects;

insert into crm.projects values('Batman','no contact', 0, 10000000, str_to_Date('01-01-2020','%d-%m-%Y'));
insert into crm.projects values('Expendables 5','bid', 0, 10000000, str_to_Date('03-02-2020','%d-%m-%Y'));
insert into crm.projects values('Bruce Lee','bid accepted', 0, 10000000, str_to_Date('05-08-2020','%d-%m-%Y'));

commit;



delete from crm.projects where name='batman';

truncate table projects;

select * from crm.projects;

grant all on crm.projects to webuser;

insert INTO crm.projects values ('test','test', 3,4000,str_to_Date('2020-03-04','%Y-%m-%d');

update crm.projects set status = 'teasdfst', bids=0,budaccountget = 0,release_dt = '2020-01-01T08:00:00.000Z' where name = 'test';


SELECT USERNAME, TOKEN FROM crm.token WHERE username = 'testu1' and token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHUxIiwiYWNjZXNzIjoiYXV0aCIsImlhdCI6MTU0NzY4MjYyMn0.NVDv_vbgn9nXVT3qTDz5vVgjwykRQsndrvb8oN8TvRY';

SELECT USERNAME, TOKEN FROM crm.token WHERE username = 'testu1' and token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHUxIiwiYWNjZXNzIjoiYXV0aCIsImlhdCI6MTU0NzY4MjYyMn0.NVDv_vbgn9nXVT3qTDz5vVgjwykRQsndrvb8oN8TvRY';

SELECT USERNAME, TOKEN FROM crm.token WHERE username = 'undefined' and token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1MSIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1NDc2ODQ5MTZ9.TZwdgngXyterxtGGPI-mDpsZ4ez1-_dTfbAC8PQKGmQ';