-- DATA
INSERT INTO departments (title) VALUES ("Finance"), ("Marketing"), ("Maintenance");
INSERT INTO roles (title, deptId) VALUES ("Accountant", 1), ("Treasurer", 1), ("Salesman", 2), ("Campaigner", 2), ("Plumber", 3);
INSERT INTO employees (firstName, lastName, roleId)
    VALUES
    ("Tim", "Lam", 1),
    ("Jessica", "Blankemeier", 1),
    ("Lisbeth", "Machado", 2),
    ("David", "Naimi", 3),
    ("Shelby", "Rothman", 2);