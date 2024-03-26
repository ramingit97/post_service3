import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1711434929934 implements MigrationInterface {
    name = 'Post1711434929934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaraunt" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_dc3165a6b43fbd76f88ec83cd37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'partner', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "count" integer NOT NULL, "restarauntId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_66b773780ac1e48b1494885208b" UNIQUE ("refresh_token"), CONSTRAINT "UQ_8769073e38c365f315426554ca5" UNIQUE ("user_id"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaraunt" ADD CONSTRAINT "FK_fabef1937944de0f4f6ab273c03" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_0791709c1e7ad0d5db5b2786bac" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_e81403d199fdc91200b23125f34" FOREIGN KEY ("restarauntId") REFERENCES "restaraunt"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_e81403d199fdc91200b23125f34"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_0791709c1e7ad0d5db5b2786bac"`);
        await queryRunner.query(`ALTER TABLE "restaraunt" DROP CONSTRAINT "FK_fabef1937944de0f4f6ab273c03"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "restaraunt"`);
    }

}
