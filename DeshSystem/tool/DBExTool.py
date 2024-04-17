from tool.DBTool import DBTool


class DBExTool(DBTool):

    def sel_user_name_and_pwd(self, name, pwd):
        sql = "select * from user where name = %s and pwd = %s"
        result = self.sel_data_one(sql, [name, pwd])
        return result
