import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(private readonly dataSource: DataSource) { }

    async onApplicationBootstrap() {
        await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS "Passenger" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            birthdate VARCHAR(255) NOT NULL,
            idcard VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            longitude DOUBLE PRECISION NOT NULL,
            latitude DOUBLE PRECISION NOT NULL
        );
        CREATE TABLE IF NOT EXISTS "Driver" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            birthdate VARCHAR(255) NOT NULL,
            idcard VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            longitude DOUBLE PRECISION NOT NULL,
            latitude DOUBLE PRECISION NOT NULL,
            available BOOLEAN DEFAULT TRUE
        );
        CREATE TABLE IF NOT EXISTS "Bill" (
            id SERIAL PRIMARY KEY,
            "price" DOUBLE PRECISION NOT NULL,
            "distance" DOUBLE PRECISION NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS "Trip" (
            id SERIAL PRIMARY KEY,
            status VARCHAR(255) NOT NULL,
            "originLongitude" DOUBLE PRECISION NOT NULL,
            "originLatitude" DOUBLE PRECISION NOT NULL,
            "destinationLongitude" DOUBLE PRECISION NOT NULL,
            "destinationLatitude" DOUBLE PRECISION NOT NULL,
            "passengerId" INTEGER REFERENCES "Passenger"(id) ON DELETE SET NULL,
            "driverId" INTEGER REFERENCES "Driver"(id) ON DELETE SET NULL,
            "billId" INTEGER UNIQUE REFERENCES "Bill"(id) ON DELETE SET NULL
        );
        `);

        await this.dataSource.query(`
        -- Santiago
        INSERT INTO "Passenger" (name, birthdate, idcard, phone, email, address, longitude, latitude) VALUES
            ('Pedro Alvarez', '1990-02-10', 'P100', '8091001001', 'pedro.alvarez@mail.com', 'Calle Del Sol, Santiago', -70.6996, 19.4517),
            ('Juana Castillo', '1985-05-15', 'P101', '8091001002', 'juana.castillo@mail.com', 'Av. Las Carreras, Santiago', -70.7030, 19.4545),
            ('Rafael Guzman', '1992-08-20', 'P102', '8091001003', 'rafael.guzman@mail.com', 'Calle Restauracion, Santiago', -70.7005, 19.4500),
            ('Lucia Mendez', '1988-11-30', 'P103', '8091001004', 'lucia.mendez@mail.com', 'Av. Estrella Sadhala, Santiago', -70.7050, 19.4530)
        ON CONFLICT DO NOTHING;

        -- Santo Domingo
        INSERT INTO "Passenger" (name, birthdate, idcard, phone, email, address, longitude, latitude) VALUES
            ('Carlos Perez', '1991-03-12', 'P200', '8092002001', 'carlos.perez@mail.com', 'Av. 27 de Febrero, Santo Domingo', -69.9111, 18.4861),
            ('Ana Vargas', '1987-07-25', 'P201', '8092002002', 'ana.vargas@mail.com', 'Av. Winston Churchill, Santo Domingo', -69.9392, 18.4721),
            ('Miguel Torres', '1993-12-05', 'P202', '8092002003', 'miguel.torres@mail.com', 'Av. Independencia, Santo Domingo', -69.9500, 18.4567),
            ('Patricia Jimenez', '1989-09-18', 'P203', '8092002004', 'patricia.jimenez@mail.com', 'Av. España, Santo Domingo Este', -69.8574, 18.4896)
        ON CONFLICT DO NOTHING;

        -- La Romana
        INSERT INTO "Passenger" (name, birthdate, idcard, phone, email, address, longitude, latitude) VALUES
            ('Esteban Diaz', '1994-06-22', 'P300', '8093003001', 'esteban.diaz@mail.com', 'Calle Duarte, La Romana', -68.9708, 18.4273),
            ('Mariana Lopez', '1986-10-10', 'P301', '8093003002', 'mariana.lopez@mail.com', 'Calle Central, La Romana', -68.9720, 18.4300),
            ('Roberto Sanchez', '1990-01-17', 'P302', '8093003003', 'roberto.sanchez@mail.com', 'Av. Libertad, La Romana', -68.9735, 18.4285),
            ('Gabriela Fernandez', '1995-04-28', 'P303', '8093003004', 'gabriela.fernandez@mail.com', 'Calle Principal, La Romana', -68.9740, 18.4290)
        ON CONFLICT DO NOTHING;
        `);

        await this.dataSource.query(`
        -- Santiago
        INSERT INTO "Driver" (name, birthdate, idcard, phone, email, address, longitude, latitude, available) VALUES
            ('Jose Martinez', '1980-01-20', 'D100', '8094004001', 'jose.martinez@mail.com', 'Calle Del Sol, Santiago', -70.6996, 19.4517, TRUE),
            ('Sofia Vargas', '1993-06-18', 'D101', '8094004002', 'sofia.vargas@mail.com', 'Av. Las Carreras, Santiago', -70.7030, 19.4545, FALSE),
            ('Pedro Garcia', '1987-11-11', 'D102', '8094004003', 'pedro.garcia@mail.com', 'Calle Restauracion, Santiago', -70.7005, 19.4500, TRUE),
            ('Laura Fernandez', '1991-02-25', 'D103', '8094004004', 'laura.fernandez@mail.com', 'Av. Estrella Sadhala, Santiago', -70.7050, 19.4530, FALSE)
        ON CONFLICT DO NOTHING;

        -- Santo Domingo
        INSERT INTO "Driver" (name, birthdate, idcard, phone, email, address, longitude, latitude, available) VALUES
            ('Juan Castillo', '1980-01-20', 'D200', '8095005001', 'juan.castillo@mail.com', 'Av. Winston Churchill, Santo Domingo', -69.9392, 18.4721, TRUE),
            ('Elena Jimenez', '1996-10-30', 'D201', '8095005002', 'elena.jimenez@mail.com', 'Av. 27 de Febrero, Santo Domingo', -69.9111, 18.4861, TRUE),
            ('Miguel Torres', '1985-08-14', 'D202', '8095005003', 'miguel.torres@mail.com', 'Av. Independencia, Santo Domingo', -69.9500, 18.4567, FALSE),
            ('Patricia Mendez', '1989-09-18', 'D203', '8095005004', 'patricia.mendez@mail.com', 'Av. España, Santo Domingo Este', -69.8574, 18.4896, TRUE)
        ON CONFLICT DO NOTHING;

        -- La Romana
        INSERT INTO "Driver" (name, birthdate, idcard, phone, email, address, longitude, latitude, available) VALUES
            ('Carlos Sanchez', '1990-09-05', 'D300', '8096006001', 'carlos.sanchez@mail.com', 'Calle Duarte, La Romana', -68.9708, 18.4273, FALSE),
            ('Maria Rodriguez', '1995-07-15', 'D301', '8096006002', 'maria.rodriguez@mail.com', 'Calle Central, La Romana', -68.9720, 18.4300, TRUE),
            ('Roberto Diaz', '1992-03-10', 'D302', '8096006003', 'roberto.diaz@mail.com', 'Av. Libertad, La Romana', -68.9735, 18.4285, TRUE),
            ('Gabriela Torres', '1988-11-30', 'D303', '8096006004', 'gabriela.torres@mail.com', 'Calle Principal, La Romana', -68.9740, 18.4290, FALSE)
        ON CONFLICT DO NOTHING;
        `);

        await this.dataSource.query(`
        INSERT INTO "Bill" (price, distance) VALUES
            (200, 3.2),
            (180, 2.7),
            (350, 7.5),
            (400, 8.1),
            (120, 1.9),
            (90, 1.2)
        ON CONFLICT DO NOTHING;
        `);

        await this.dataSource.query(`
        INSERT INTO "Trip" (status, "originLongitude", "originLatitude", "destinationLongitude", "destinationLatitude", "passengerId", "driverId", "billId") VALUES
            ('active', -70.6996, 19.4517, -70.7030, 19.4545, 1, 1, 1),
            ('completed', -70.7005, 19.4500, -70.7050, 19.4530, 3, 4, 2),
            ('active', -69.9111, 18.4861, -69.9392, 18.4721, 5, 5, 3),
            ('completed', -69.9500, 18.4567, -69.8574, 18.4896, 7, 8, 4),
            ('active', -68.9708, 18.4273, -68.9720, 18.4300, 9, 9, 5),
            ('completed', -68.9735, 18.4285, -68.9740, 18.4290, 11, 12, 6)
        ON CONFLICT DO NOTHING;
        `);
    }
}
