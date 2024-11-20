import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderDetailsProductsTable1732121087854 implements MigrationInterface {
    name = 'CreateOrderDetailsProductsTable1732121087854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_details_products" ("order_details_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_3862faaeb6f4b71b4473edcf152" PRIMARY KEY ("order_details_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1926953a351a481eb20231429b" ON "order_details_products" ("order_details_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fac3bbf92765b25be9eaafb28a" ON "order_details_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_1926953a351a481eb20231429b7" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_1926953a351a481eb20231429b7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(25)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fac3bbf92765b25be9eaafb28a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1926953a351a481eb20231429b"`);
        await queryRunner.query(`DROP TABLE "order_details_products"`);
    }

}
