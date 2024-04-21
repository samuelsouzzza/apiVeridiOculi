CREATE TABLE users (
	id_user INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	complete_name_user VARCHAR(255) NOT NULL,
	email_user VARCHAR(255) NOT NULL,
	cpf_user VARCHAR(14) NOT NULL,
	password_user VARCHAR(255) NOT NULL,
	premium_user BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (complete_name_user, email_user, cpf_user, password_user) VALUES 
('Samuel Ribeiro de Souza', 'rssamuel17@gmail.com', '529228508880', '441133'),
('Camila Trindade Tagami', 'camilatagami@gmail.com', '4567891234598', '123');