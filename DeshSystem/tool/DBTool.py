import pymysql

from conf import Config


class DBTool:
    is_auto_close = True

    def __init__(self,
                 host=Config.DB_HOST,
                 port=int(Config.DB_PORT),
                 user=Config.DB_USER,
                 password=Config.DB_PASS,
                 db=Config.DB_NAME):
   
        self.db = pymysql.connect(host=host,
                                  port=port,
                                  user=user,
                                  password=password,
                                  db=db)  
        self.cursor = self.db.cursor(cursor=pymysql.cursors.DictCursor)

    def close(self):

        self.db.close()

    def sel_data(self, sql, data_lst):

        self.cursor.execute(sql, data_lst)
        data = self.cursor.fetchall()
        if self.is_auto_close:
            self.close()
        return data

    def sel_data_one(self, sql, data_lst):
 
        self.cursor.execute(sql, data_lst)
        data = self.cursor.fetchone()
        if self.is_auto_close:
            self.close()
        return data

    def execute_sql(self, sql, data_lst):
  
        result = False
        try:
            self.cursor.execute(sql, data_lst)
            self.db.commit()
            result = True
        except Exception as e:
            print("DBTool execute_sql: ", e)
        if self.is_auto_close:
            self.close()
        return result
