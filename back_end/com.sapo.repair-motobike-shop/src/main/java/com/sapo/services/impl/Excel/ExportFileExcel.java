package com.sapo.services.impl.Excel;

import com.sapo.common.Common;
import com.sapo.dao.jpa.TimeSheetDAO;
import com.sapo.dto.timesheets.UserTimeSheetDTOExportExcel;
import com.sapo.entities.Timesheet;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.List;

public class ExportFileExcel {
    public static final int COLUMN_INDEX_CODE         = 0;
    public static final int COLUMN_INDEX_NAME      = 1;
    public static final int COLUMN_INDEX_NUMBERSHIFTSWORK      = 2;
    public static final int COLUMN_INDEX_NUMBERSHIFTSLATEWORK   = 3;
    public static final int COLUMN_INDEX_MONTH      = 4;
    public static final int COLUMN_INDEX_SALARY      = 5;
    private static CellStyle cellStyleFormatNumber = null;

    private final TimeSheetDAO timeSheetDAO;


    public ExportFileExcel(TimeSheetDAO timeSheetDAO) {
        this.timeSheetDAO = timeSheetDAO;
    }

    public static ByteArrayInputStream  writeExcel(List<UserTimeSheetDTOExportExcel> timeSheetUsers, String excelFilePath) throws IOException {
        // tạo timesheet
        Workbook timesheet = getWorkbook(excelFilePath);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // Tạo sheet
        Sheet sheet = timesheet.createSheet("Bảng_Công_Nhân_viên_Tháng"); // Create sheet with sheet name

        int rowIndex = 0;

        // Write header
        writeHeader(sheet, rowIndex);

        // Write data
        rowIndex++;
        for (UserTimeSheetDTOExportExcel timeSheetUser : timeSheetUsers) {

            // Tạo các hàng
            Row row = sheet.createRow(rowIndex);
            // Viết data vào các hàng
            writeBook(timeSheetUser, row);
            rowIndex++;
        }

        // Viết footer
        writeFooter(sheet, rowIndex, timeSheetUsers);

        // Tự động thay đổi theo kích thước
        int numberOfColumn = sheet.getRow(0).getPhysicalNumberOfCells();
        autosizeColumn(sheet, numberOfColumn);

        // Tạo file excel
        createOutputFile(timesheet, excelFilePath);
        timesheet.write(out);
        System.out.println("out" +  out);
        return new ByteArrayInputStream(out.toByteArray() );
    }




    // Tạo workbook
    private static Workbook getWorkbook(String excelFilePath) throws IOException {

        Workbook workbook = new XSSFWorkbook();
        OutputStream fileOut = new FileOutputStream(excelFilePath);
        try {
            workbook.write(fileOut);
            return workbook;
        }catch (IOException e){
            throw new IOException("Lỗi Tạo file excel");
        }

    }

    // viết header với format
    private static void writeHeader(Sheet sheet, int rowIndex) {
        // create CellStyle
        CellStyle cellStyle = createStyleForHeader(sheet);

        // Create row
        Row row = sheet.createRow(rowIndex);

        // Create cells
        Cell cell = row.createCell(COLUMN_INDEX_CODE);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Mã NV");

        cell = row.createCell(COLUMN_INDEX_NAME);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Họ Tên");

        cell = row.createCell(COLUMN_INDEX_NUMBERSHIFTSWORK);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Số công");

        cell = row.createCell(COLUMN_INDEX_NUMBERSHIFTSLATEWORK);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Số công muộn");

        cell = row.createCell(COLUMN_INDEX_MONTH);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Tháng");

        cell = row.createCell(COLUMN_INDEX_SALARY);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Lương");
    }

    // viết dữ liệu
    private static void writeBook(UserTimeSheetDTOExportExcel timeSheetUser, Row row) {
        if (cellStyleFormatNumber == null) {
            // Format number
            short format = (short)BuiltinFormats.getBuiltinFormat("#,##0");
            // DataFormat df = workbook.createDataFormat();
            // short format = df.getFormat("#,##0");

            //Create CellStyle
            Workbook workbook = row.getSheet().getWorkbook();
            cellStyleFormatNumber = workbook.createCellStyle();
            cellStyleFormatNumber.setDataFormat(format);
        }

        Cell cell = row.createCell(COLUMN_INDEX_CODE);
        cell.setCellValue(timeSheetUser.getCode());

        cell = row.createCell(COLUMN_INDEX_NAME);
        cell.setCellValue(timeSheetUser.getName());

        cell = row.createCell(COLUMN_INDEX_NUMBERSHIFTSWORK);
        cell.setCellValue(timeSheetUser.getNumberShiftsWork());


        cell = row.createCell(COLUMN_INDEX_NUMBERSHIFTSLATEWORK);
        cell.setCellValue(timeSheetUser.getNumberShiftsLateWork());

        cell = row.createCell(COLUMN_INDEX_MONTH);
        cell.setCellValue(timeSheetUser.getMonth());

        cell = row.createCell(COLUMN_INDEX_SALARY);
        cell.setCellValue(timeSheetUser.getSalary());

    }

    // Tạo CellStyle cho header
    private static CellStyle createStyleForHeader(Sheet sheet) {
        // Create font
        Font font = sheet.getWorkbook().createFont();
        font.setFontName("Times New Roman");
        font.setBold(true);
        font.setFontHeightInPoints((short) 14); // font size
        font.setColor(IndexedColors.WHITE.getIndex()); // text color

        // Create CellStyle
        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setFont(font);
        cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        return cellStyle;
    }

    // Viết footer
    private static void writeFooter(Sheet sheet, int rowIndex, List<UserTimeSheetDTOExportExcel> timeSheetUsers) {
        double sumSalary = 0;
        for (int i =0; i< timeSheetUsers.size() ; i++){
            sumSalary += timeSheetUsers.get(i).getSalaryDouble();
        }
        String sum = Common.getStringPriceVN(sumSalary);
        // Create row
        Row row = sheet.createRow(rowIndex);

        Cell cell = row.createCell(COLUMN_INDEX_MONTH);
        CellStyle cellStyle = createStyleForHeader(sheet);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Tổng: ");

        cell = row.createCell(COLUMN_INDEX_SALARY);
        cell.setCellValue(sum);
    }

    // Tự động thay đổi kích thước chiều rộng cột
    private static void autosizeColumn(Sheet sheet, int lastColumn) {
        for (int columnIndex = 0; columnIndex < lastColumn; columnIndex++) {
            sheet.autoSizeColumn(columnIndex);
        }
    }

    // tạo file output
    private static void createOutputFile(Workbook workbook, String excelFilePath) throws IOException {
        try (OutputStream os = new FileOutputStream(excelFilePath)) {
            workbook.write(os);
        }
    }

}
