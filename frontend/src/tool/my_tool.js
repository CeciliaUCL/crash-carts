import $ from 'jquery';

class MyTool {
    checkInput(data_lst) {
        for (let i = 0; i < data_lst.length; i++) {
            if ($.trim(data_lst[i]) === "") {
                return false;
            }
        }
        return true;
    }

    aj_req(call_func, sig, url, data_dict = {}, async = true, type = "POST", dataType = "text") {
        $.ajax({
            url: url, type: type, data: data_dict, async: async, dataType: dataType, success: function (data) {
                if ($.trim(data) === "") {
                    call_func($.trim(data), sig)
                } else {
                    call_func(JSON.parse(data), sig)
                }
            }, error: function () {
                window.alert("Request Error!")
            }
        });
    }


    fill_zero(num, start_num) {
        return num.toString().padStart(start_num, '0');
    }


}

export default MyTool;