package com.sapo.validate;

import com.sapo.exception.InputException;

public class TimeSheetValidate {

    // Hàm kiểm tra đầu vào không quá 31
    public static void checkInputNumberWorkOnMonth(int workDay ){
        if(workDay < 0){
            throw  new InputException("Ngày công không thể nhỏ hơn 0");
        }if (workDay > 31){
            throw new InputException("Ngày công trong một tháng không thể lớn hơn 31");
        }
    }

}
