BEGIN;
CREATE TABLE "arinabodina_album" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(33) NOT NULL,
    "preview" varchar(100) NOT NULL,
    "indexOnMain" integer,
    "date" date NOT NULL
)
;
CREATE TABLE "arinabodina_albumimage" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "album_id" integer NOT NULL REFERENCES "arinabodina_album" ("id"),
    "image" varchar(100) NOT NULL
)
;
CREATE TABLE "arinabodina_video" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoUrl" varchar(200) NOT NULL,
    "indexOnMain" integer,
    "date" date NOT NULL
)
;
CREATE INDEX "arinabodina_albumimage_6781e42a" ON "arinabodina_albumimage" ("album_id");

COMMIT;
