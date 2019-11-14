import DB from '../DB';

const employeTable = `CREATE TABLE IF NOT EXISTS employees(
employeeid bigserial NOT NULL,
email character varying NOT NULL,
password character varying NOT NULL,
address character varying,
gender character varying,
jobrole character varying NOT NULL,
firstname character varying(100),
lastname character varying(100),
department character varying(100),
CONSTRAINT employee_pkey PRIMARY KEY(employeeid)
)`;

const articleTable = `CREATE TABLE IF NOT EXISTS articles(
articleid bigserial NOT NULL,
employeeid bigserial,
title character varying NOT NULL,
article character varying NOT NULL,
CONSTRAINT article_pkey PRIMARY KEY(articleid),
CONSTRAINT article_id_employee_idfkey FOREIGN KEY(employeeid)
REFERENCES employees
)`;

const gifTable = `CREATE TABLE IF NOT EXISTS gifs(
gifid bigserial NOT NULL,
employeeid bigserial,
title character varying NOT NULL,
image_url character varying NOT NULL,
CONSTRAINT gif_pkey PRIMARY KEY(gifid),
CONSTRAINT gif_id_employee_idfkey FOREIGN KEY(employeeid)
REFERENCES employees
)`;

const commentArticleTable = `CREATE TABLE IF NOT EXISTS comments_articles(
commentid bigserial NOT NULL,
employeeid bigserial,
articleid bigserial,
comment character varying NOT NULL,
CONSTRAINT comment_article_pkey PRIMARY KEY(commentid),
CONSTRAINT article_comment_id_employee_idfkey FOREIGN KEY(employeeid)REFERENCES employees,
CONSTRAINT article_comment_id_article_idfkey FOREIGN KEY(articleid)
REFERENCES articles
)`;

const gifCommentTable = `CREATE TABLE IF NOT EXISTS comments_gifs(
commentid bigserial NOT NULL,
employeeid bigserial,
gifid bigserial,
comment character varying NOT NULL,
CONSTRAINT comment_gif_pkey PRIMARY KEY(commentid),
CONSTRAINT gif_comment_id_employee_idfkey FOREIGN KEY(employeeid)
REFERENCES employees,
CONSTRAINT gif_comment_id_article_idfkey FOREIGN KEY(gifid)
REFERENCES gifs
)`;

class Table {
  static async createTables() {
    await DB.query(employeTable);
    await DB.query(gifTable);
    await DB.query(articleTable);
    await DB.query(commentArticleTable);
    await DB.query(gifCommentTable);
  }
}

export default Table.createTables().catch((error) => console.log('error', error));
