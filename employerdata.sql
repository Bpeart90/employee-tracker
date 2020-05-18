USE cms;

INSERT into department
    (id, name)
VALUES
    (1, "Operations");
INSERT into department
    (id, name)
VALUES
    (2, "Acconting");
insert into department
    (id, name)
Values
    (3, "Research");
INSERT into department
    (id, name)
VALUES
    (4, "HR");

INSERT into role
    (id, title, salary, department_id)
VALUES
    (1, "Operations Manager", 100000, 1);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (2, "Operations person", 50000, 1);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (3, "Accounting Manager", 100000, 2);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (4, "Accounting Associate", 900000, 2);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (5, "Research Manager", 100000, 3);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (6, "Research Supervisor", 30000, 3);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (7, "Research Associate", 30000, 3);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (8, "Research Analyst", 30000, 3);
INSERT into role
    (id, title, salary, department_id)
VALUES
    (9, "HR Representative", 80000, 4);

INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (11, "John H.", "Patterson", 1, null);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (12, "Mary Kay", "Ash", 2, 1);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (13, "Dale", "Carnegie", 2, 1);

INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (21, "Michael", "Scott", 3, null);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (22, "Dwight", "Strud", 4, 3);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (23, "Kermit", "Frog", 4, 3);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (24, "Billy", "Cyrus", 4, 3);

INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (31, "Bob", "Barker", 5, null);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (32, "Jeff", "Ross", 6, 5);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (33, "Dave", "Matthews", 7, 5);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (34, "Jim", "Ross", 7, 5);
INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (35, "Dave", "Chappelle", 8, 5);

INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (41, "Deanna", "Ross", 9, null);