package com.sapo.validate;

import com.sapo.exception.InputException;

public class InvoiceValidate {
    public static void checkInvoiceDelete(int status){
        boolean checkStatus = checkStatus(status);
        if(checkStatus== false) {
            throw new InputException("Không được xóa phiếu sửa chữa đang sửa, chờ thanh toán và thanh toán");
        }
    }

    //Hàm check trạng thái 1,2,7 để xóa
    private static boolean checkStatus(int status){
        if(status == 1 || status == 2 || status == 7){
            return true;
        }else{
            return false;
        }
    }
}
