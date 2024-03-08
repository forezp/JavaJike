---
lang: zh-CN
title: Mysql综合练习题
headerDepth: 0
order: 8
icon: lianjie
description: Mysql综合练习题
---





### Mysql综合练习题

![109table1.png](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/8/2279594-93ee71eedc07ed76.png)

![109table2.png](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/8/2279594-aaf968e896103c51.png)

### 创建表

创建数据库：

```
CREATE DATABASE test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

创建student表

```
create table student(id int(10) not null unique primary key ,name varchar(20) not null, sex varchar(4),birth year,department varchar(20) ,address varchar(50));
```

创建score表

```
create table score(id int(10) not null unique primary key auto_increment,stu_id int(10) not null,c_name varchar(20),grade int(10));
```

### 插入数据

插入学生：

```
insert into student values(901,'张老大','男',1985,'计算机系','北京市海淀区');
insert into student values(902,'张老二','男',1986,'中文系','北京市昌平区');
insert into student values(903,'张三','女',1990,'中文系','湖南省永州市');
insert into student values(904,'李四','男',1990,'英语系','辽宁省阜新市');
insert into student values(905,'王五','女',1991,'英语系','福建省厦门市');
insert into student values(906,'王六','男',1988,'计算机系','湖南省衡阳市');
```

插入成绩：

```
insert into score values(null,901,'计算机',98);
insert into score values(null,901,'英语',80);
insert into score values(null,902,'计算机',65);
insert into score values(null,902,'中文',88);
insert into score values(null,903,'计算机',95);
insert into score values(null,904,'计算机',70);
insert into score values(null,904,'英语',92);
insert into score values(null,905,'英语',94);
insert into score values(null,906,'计算机',90);
insert into score values(null,906,'英语',85);
```

### 查询学生表中的所有记录

```
 select * from student;
 select id ,name ,sex,birth,department,address from student;
```

### 查询 student表中2-4条记录

```
select * from student limit 1,3;
```

### 查询student学生的学号、姓名和院校信息

```
select id ,name ,department from student;
```

### 查询计算机系和英语系的学生的信息的两种方法

```
select * from student where department in ('计算机系','英语系');

select * from student where department ='计算机系' or department='英语系';
```

### 查询年龄为18-22岁的学生

```
select name ,2009-birth as age from student;

select id ,name ,sex,2009-birth as age ,department,address from student where 2009-birth between 18 and 22;

select id ,name ,sex ,2009-birth as age ,department,address from student where 2009-birth>=18 and 2009-birth <=22;
```

### student表中查询每个院系有多少人

```
 select department,count(id) from student group by department;

 select department,count(id) as sum_of_department from student group by department;
```

### 从score 表中查询每个科目的最高分

```
select c_name,max(grade) from score group by c_name;
```

### 查询李四的考试科目（c_name)和考试成绩(grade).

```
select c_name ,grade from score where stu_id =(select id from student where name='李四');
```

### 用连接查询的方式查询所有学生的信息和考试成绩

```
select student.id ,name,sex,birth,department,addess,c_name,grade from student,score where student.id=score.stu_id;

select s1.id ,name ,sex,birth ,department,address,c_name,grade from student s1,score s2 where s1.id =s2.stu_id;
```

### 计算每个学生的总成绩

```
select stu_id,sum(grade) from score group by stu_id;
```

如果要显示学生的姓名：

```
select student.id ,name ,sum(grade) from student ,score where student.id=score.stu_id group by student.id;
```

### 计算每个考试科目的平均成绩

```
select c_name ,avg(grade) from score group by c_name;
```

### 查询计算机成绩低于95分的学生成绩

```
select * from student where id in(select stu_id from score whewre c_name='计算机' and grade <95);
```

### 查询同时参加计算机和英语考试的学生信息

```
select * from student where id=any (select stu_id from score where stu_id in (select stu_id from score where c_name='计算机') and c_name ='英语');
```

### 将计算机成绩按从高到低进行排序

```
select stu_id,grade from score where c_name='计算机' order by grade desc;
```

### 从student表和score 表中查询出学号然后合并查询结果

```
select id from student union select stu_id from score;
```

### 查询姓张和姓王的同学的姓名、院系、考试科目和成绩。

```
select student.id ,name,sex,birth,department,address,c_name,grade from student,score where (name like '张%' or name like '王%') and student.id =score.stu_id;
```

### 查询都是湖南的同学的姓名、年龄、院系、考试科目和成绩

```
select student.id ,name ,sex,birth ,department,address,c_name,grade from student,score where address like '湖南%' and student.id=score.stu_id;
```