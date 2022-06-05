package com.sapo.common;

public class ConstantVariableCommon {
    public static final int STATUS_USER_1 = 1;
    public static final int STATUS_USER_2 = 2;
    public static final int STATUS_USER_3 = 3;
    public static final int STATUS_USER_4 = 4;
    public static final int STATUS_RECEIPT_1 = 1;
    public static final int STATUS_RECEIPT_2 = 2;
    public static final int STATUS_TIMESHEET_1 = 1;
    public static final int STATUS_TIMESHEET_2 = 2;
    public static final int STATUS_ROLE_1 = 1;
    public static final int STATUS_ROLE_2 = 2;
    public static final double SALARY_EARLY = 50000;
    public static final int STATUS_PERMISSION_1 = 1;
    public static final int STATUS_PERMISSION_2 = 2;
    public static final int STATUS_SERVICE_1 = 1;// dang hoat dong
    public static final int STATUS_SERVICE_2 = 2;// ngung hoat dong
    public static final int STATUS_SERVICE_3 = 3; // xóa hẳn
    public static final int STATUS_INVOICE_1 = 1;
    public static final int STATUS_INVOICE_2 = 2;
    public static final int STATUS_INVOICE_3 = 3;
    public static final int STATUS_INVOICE_4 = 4;
    public static final int STATUS_INVOICE_5 = 5;
    public static final int STATUS_INVOICE_6 = 6;
    public static final int STATUS_INVOICE_7 = 7;  //Trạng thái đang chờ xét duyệt
    public static final int STATUS_MATERIAL_1 = 1;
    public static final int STATUS_MATERIAL_2 = 2;
    public static final int STATUS_MATERIAL_3 = 3;
    public static final int STATUS_MATERIAL_ORDER_1 = 1;
    public static final int STATUS_MATERIAL_ORDER_2 = 2;
    public static final int STATUS_MATERIAL_ORDER_3 = 3;
    public static final int STATUS_SERVICE_ORDER_1 = 1;
    public static final int STATUS_SERVICE_ORDER_2 = 2;
    public static final int STATUS_SERVICE_ORDER_3 = 3;
    public static final int QUANTITY_MATERIAL_DEFAULT = 0;
    public static final int ROLE_ID_FIXER = 3;

    //Hàm chuyển status từ int sang string
    public static String statusInvoiceIntToString(int status){
        if(status == STATUS_INVOICE_1){
            return "Chờ xử lý";
        } else if(status == STATUS_INVOICE_2){
            return "Đang chờ thợ";
        } else if(status == STATUS_INVOICE_3){
            return "Đang sửa";
        }  else if(status == STATUS_INVOICE_4){
            return "Chờ thanh toán";
        }  else if(status == STATUS_INVOICE_5){
            return "Đã thanh toán";
        }else if (status == STATUS_INVOICE_6){
            return "Đã hủy";
        }else{
            return "Đang xét duyệt";
        }
    }

    public static int statusInvoiceStringToInt(String status){
        if(status.compareTo("Chờ xử lý") ==0){
            return STATUS_INVOICE_1;
        } else if(status.compareTo("Đang chờ thợ") ==0){
            return STATUS_INVOICE_2;
        } else if(status.compareTo("Đang sửa") ==0){
            return STATUS_INVOICE_3;
        }
        else if(status.compareTo("Chờ thanh toán") ==0){
            return STATUS_INVOICE_4;
        }
        else if(status.compareTo("Đã thanh toán") ==0){
            return STATUS_INVOICE_5;
        }
        else if(status.compareTo("Đã hủy") ==0){
            return STATUS_INVOICE_6;
        }else {
            return STATUS_INVOICE_7;
        }
    }
    public static String statusMaterialOrderIntToString(int status){
        if(status == STATUS_MATERIAL_ORDER_1){
            return "Đã duyệt";
        } else if(status == STATUS_MATERIAL_ORDER_2){
            return "Đang xét duyệt";
        }else{
            return "Từ chối";
        }
    }
    public static String statusServiceOrderIntToString(int status){
        if(status == STATUS_SERVICE_ORDER_1){
            return "Đã duyệt";
        } else if(status == STATUS_SERVICE_ORDER_2){
            return "Đang xét duyệt";
        }else{
            return "Từ chối";
        }
    }

    public static String statusMaterialIntToString(int status){
        if(status == STATUS_MATERIAL_1){
            return "Đang bán";
        } else if(status == STATUS_MATERIAL_2){
            return "Không bán";
        } else {
            return "đã xóa";
        }
    }
    
    public static String statusServiceIntToString(int status){
        if(status == STATUS_MATERIAL_1){
            return "Phục vụ";
        } else {
            return "Ngưng phục vụ";
        }
    }

    public static String statusUserIntToString(int status){
        if(status == STATUS_USER_1){
            return "Đang làm việc";
        } else if(status == STATUS_USER_2){
            return "Đã nghỉ việc";
        } else if(status == STATUS_USER_3){
            return "Đang sửa xe";
        } else {
            return "Sẵn sàng sửa xe";
        }
    }
    public static String statusReceiptIntToString(int status){
        if(status == STATUS_RECEIPT_1){
            return "Đã thanh toán";
        } else {
            return "Đã hủy";
        }
    }
    public static String statusTimeSheetIntToString(int status){
        if(status == STATUS_TIMESHEET_1){
            return "Chưa trả lương";
        } else {
            return "Đã trả lương";
        }
    }
    public static String statusRoleIntToString(int status){
        if(status == STATUS_ROLE_1){
            return "Đang hoạt động";
        } else {
            return "Không hoạt động";
        }
    }
    public static String statusPermissionIntToString(int status){
        if(status == STATUS_PERMISSION_1){
            return "Đang hoạt động";
        } else {
            return "Không hoạt động";
        }
    }
    public static int statusTimeSheetStringToInt(String status){
        if(status.compareTo("Chưa trả lương") ==0){
            return STATUS_TIMESHEET_1;
        } else {
            return STATUS_TIMESHEET_2;
        }
    }
}
