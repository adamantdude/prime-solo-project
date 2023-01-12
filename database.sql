
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "char_stats" (
	"id" SERIAL PRIMARY KEY,
	"level" INT DEFAULT 1,
	"exp" INT DEFAULT 0,
	"str" INT DEFAULT 1,
	"dex" INT DEFAULT 1,
	"int" INT DEFAULT 1,
	"wis" INT DEFAULT 1,
	"fai" INT DEFAULT 1
	);
	
CREATE TABLE "character" (
	"id" SERIAL PRIMARY KEY,
	"full_name" VARCHAR(255) NOT NULL,
	"stats_id" INT REFERENCES "char_stats" UNIQUE NOT NULL,
	"history" VARCHAR(4000)
	);

CREATE TABLE "journal" (
	"id" SERIAL PRIMARY KEY,
	"notes" VARCHAR(4000)
	);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR NOT NULL,
	"character_id" INT REFERENCES "character" UNIQUE NOT NULL,
	"journal_id" INT REFERENCES "journal" UNIQUE NOT NULL,
	"access_level" INT DEFAULT 0
	);
	
CREATE TABLE "location" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"image" VARCHAR(600)
	);

CREATE TABLE "chat_history" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"location_id" INT REFERENCES "location",
	"message" VARCHAR(4000),
	"date" DATE
	);