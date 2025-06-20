
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TYPE driver_status   AS ENUM ('AVAILABLE','ON_TRIP','OFFLINE');
CREATE TYPE trip_status     AS ENUM ('REQUESTED','ONGOING','FINISHED','CANCELLED','NO_SHOW');
CREATE TYPE payment_method  AS ENUM ('CASH','CREDIT_CARD','DEBIT_CARD','TRANSFER');


CREATE TABLE drivers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       VARCHAR(120) NOT NULL,
  phone           VARCHAR(20)  NOT NULL UNIQUE,
  email           VARCHAR(100) UNIQUE,
  vehicle_plate   VARCHAR(50)  NOT NULL UNIQUE,
  vehicle_model   VARCHAR(100) NOT NULL,
  driver_license  VARCHAR(50)  NOT NULL UNIQUE,
  status          driver_status NOT NULL DEFAULT 'OFFLINE',
  latitude        NUMERIC(10,8),
  longitude       NUMERIC(10,8),
  rating          NUMERIC(3,2) NOT NULL DEFAULT 5.00,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);


CREATE TABLE passengers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   VARCHAR(120) NOT NULL,
  phone       VARCHAR(20)  NOT NULL UNIQUE,
  email       VARCHAR(100) UNIQUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);


CREATE TABLE trips (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     UUID NOT NULL,
  passenger_id  UUID NOT NULL,

  origin_lat    NUMERIC(10,8) NOT NULL,
  origin_long   NUMERIC(10,8) NOT NULL,
  dest_lat      NUMERIC(10,8) NOT NULL,
  dest_long     NUMERIC(10,8) NOT NULL,

  distanceKm    NUMERIC(10,2),    
  duration_sec  INTEGER,

  fare          NUMERIC(10,2) NOT NULL,
  currency      VARCHAR(3)    NOT NULL DEFAULT 'CLP',

  status        trip_status   NOT NULL DEFAULT 'REQUESTED',

  requested_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
  started_at    TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT fk_trips_driver
      FOREIGN KEY (driver_id)    REFERENCES drivers(id),
  CONSTRAINT fk_trips_passenger
      FOREIGN KEY (passenger_id) REFERENCES passengers(id)
);
CREATE INDEX idx_trips_driver_id    ON trips(driver_id);
CREATE INDEX idx_trips_passenger_id ON trips(passenger_id);

CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id         UUID NOT NULL UNIQUE,
  subtotal        NUMERIC(10,2) NOT NULL,
  tax             NUMERIC(10,2) NOT NULL,
  total           NUMERIC(10,2) NOT NULL,
  currency        VARCHAR(3)    NOT NULL DEFAULT 'CLP',
  payment_method  payment_method NOT NULL,
  issued_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT fk_invoice_trip
      FOREIGN KEY (trip_id) REFERENCES trips(id)
      ON DELETE CASCADE
);

INSERT INTO drivers
(full_name, phone, email, vehicle_plate, vehicle_model, driver_license,
 status, latitude, longitude) VALUES

('Juan Pérez', '56911111111', 'juan@example.com',
 'AA-BB11', 'Toyota Prius', 'CL123456',
 'AVAILABLE', -33.45000000, -70.66000000),


('Ana Gómez', '56922222222', 'ana@example.com',
 'BB-CC22', 'Hyundai Ioniq', 'CL654321',
 'ON_TRIP', -33.47000000, -70.64000000),


('Pedro Silva', '56933333333', 'pedro@example.com',
 'CC-DD33', 'Kia Rio 5', 'CL789012',
 'AVAILABLE', -33.48000000, -70.67000000),

('Laura Díaz', '56944444444', 'laura@example.com',
 'DD-EE44', 'Kia Morning', 'CL345678',
 'OFFLINE', -33.49000000, -70.68000000);


INSERT INTO passengers
(full_name, phone, email) VALUES
('María López',  '56988888888', 'maria@example.com'),
('Carlos Bravo', '56999999999', 'carlos@example.com'),
('Sofía Vega',   '56977777777', 'sofia@example.com');

WITH
  d AS (SELECT id FROM drivers    WHERE phone='56911111111'),
  p AS (SELECT id FROM passengers WHERE phone='56988888888'),
  t AS (
    INSERT INTO trips
      (driver_id, passenger_id,
       origin_lat, origin_long, dest_lat, dest_long,
       distanceKm, duration_sec,
       fare, currency, status)
    SELECT d.id, p.id,
           -33.4600, -70.6500, -33.4400, -70.6800,
           5.2, 900,
           7500, 'CLP', 'FINISHED'
    FROM d, p RETURNING id
  )
INSERT INTO invoices
  (trip_id, subtotal, tax, total, currency, payment_method)
SELECT id, 6320, 1180, 7500, 'CLP', 'CASH' FROM t;

WITH
  d AS (SELECT id FROM drivers    WHERE phone='56911111111'),
  p AS (SELECT id FROM passengers WHERE phone='56999999999'),
  t AS (
    INSERT INTO trips
      (driver_id, passenger_id,
       origin_lat, origin_long, dest_lat, dest_long,
       distanceKm, duration_sec,
       fare, currency, status)
    SELECT d.id, p.id,
           -33.4500, -70.6600, -33.4200, -70.6700,
           3.8, 600,
           4300, 'CLP', 'REQUESTED'
    FROM d, p RETURNING id
  )
INSERT INTO invoices
  (trip_id, subtotal, tax, total, currency, payment_method)
SELECT id, 3627, 673, 4300, 'CLP', 'CREDIT_CARD' FROM t;

WITH
  d AS (SELECT id FROM drivers    WHERE phone='56922222222'),
  p AS (SELECT id FROM passengers WHERE phone='56988888888'),
  t AS (
    INSERT INTO trips
      (driver_id, passenger_id,
       origin_lat, origin_long, dest_lat, dest_long,
       distanceKm, duration_sec,
       fare, currency, status)
    SELECT d.id, p.id,
           -33.4700, -70.6400, -33.4500, -70.6900,
           4.5, 780,
           6200, 'CLP', 'ONGOING'
    FROM d, p RETURNING id
  )
INSERT INTO invoices
  (trip_id, subtotal, tax, total, currency, payment_method)
SELECT id, 5322, 878, 6200, 'CLP', 'DEBIT_CARD' FROM t;
