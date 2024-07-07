CREATE DATABASE veridioculi_db;
USE veridioculi_db;
CREATE TABLE users (
	id_user INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	complete_name_user VARCHAR(255) NOT NULL,
	email_user VARCHAR(255) NOT NULL,
	cpf_user VARCHAR(14) NOT NULL,
	password_user VARCHAR(255) NOT NULL,
	premium_user BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE analysis (
    id_analysis INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    target_species_name_analysis VARCHAR(100) NOT NULL,
    date_analysis VARCHAR(20) NOT NULL,
    status_analysis VARCHAR(50) NOT NULL,
    id_user INT(11), 
    CONSTRAINT fk_id_user FOREIGN KEY (id_user) REFERENCES users(id_user) 
);

CREATE TABLE images (
	id_image INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	original_path_image VARCHAR(255) NOT NULL,
	ia_path_image VARCHAR(255) NOT NULL,
	species_name_image VARCHAR(100) NOT NULL,
	accuracy_image DOUBLE NOT NULL,
	id_analysis INT(11),
	CONSTRAINT fk_id_analysis FOREIGN KEY (id_analysis) REFERENCES analysis(id_analysis)
);
