INSERT INTO department (name)
VALUES 
('Service'),
('IT'),
('Facilities'),
('Sales');

INSERT INTO role (title, salary, dept_id)
VALUES
('Service Engineer', 90000, 1),
('Service Manager', 120000, 1),
('Janitor', 50000, 3),
('Facilities Manager', 80000, 3),
('Lead Developer', 140000, 2),
('Software Engineer', 120000, 2),
('Sales Manager', 100000, 4),
('Accountant', 100000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Laura', 'Bailey', 2, null),
('Hank', 'Green', 1, 2),
('Ashley', 'Johnson', 4, null),
('Matt', 'Mercer', 3, 4),
('Talesin', 'Jaffey', 5, null),
('Peter', 'Parker', 6, 5),
('Mary', 'Jane', 7, null),
('Bruce', 'Wayne', 8, 7);