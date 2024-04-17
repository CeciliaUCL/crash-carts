from flask import Flask, request
from flask_cors import CORS, cross_origin

from tool import JsonTool
from tool.DBExTool import DBExTool

app = Flask(__name__, static_folder="./static")
cors = CORS(app)


@app.route('/aj_sel_user_name_and_pwd', methods=['GET', 'POST'])
@cross_origin()
def sel_news_to_tag_lst_order_desc():
    data = request.values
    name = data.get("name")
    pwd = data.get("pwd")
    return JsonTool.json_dump_str(0 if DBExTool().sel_user_name_and_pwd(name, pwd) else -1)


if __name__ == '__main__':
    app.run(debug=True)
