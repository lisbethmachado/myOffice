-- DATA
INSERT INTO departments (title) VALUES ("Finance"), ("Marketing"), ("Maintenance");
INSERT INTO roles (title, salary, deptId) VALUES ("Accountant", "56500.50", 1), ("Treasurer", "63750.30", 1), ("Salesman", "47201.75", 2), ("Campaigner", "42800.20", 2), ("Plumber", "51000.01", 3);
INSERT INTO employees (firstName, lastName, roleId)
    VALUES
    ("Tim", "Lam", 1),
    ("Jessica", "Blankemeier", 1),
    ("Lisbeth", "Machado", 2),
    ("David", "Naimi", 3),
    ("Shelby", "Rothman", 2);