 use employees;

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('IT'),
    ('Legal');
    ('Marketing'),

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Lead', 100000, 1),
    ('Marketing', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('IT Service Desk', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jill', 'Doe', 1, NULL),
    ('Kate', 'Doe', 2, 1),
    ('Sally', 'Doe', 3, NULL),
    ('Mary', 'Person', 4, 3),
    ('Greg', 'Lewis', 5, NULL),
    ('Adam', 'Lewee', 6, 5),
    ('James', 'Jones', 7, NULL),
    ('Kathy', 'Kaden', 8, 7);