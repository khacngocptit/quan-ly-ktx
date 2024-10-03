import { Response } from "express";

export enum ClientPlatform {
    MOBILE = "Mobile",
    WEB = "Web",
}

export enum QueueName {
    ONE_SIGNAL = "ONE_SIGNAL",
}

export enum ExportType {
    WORD = "word",
    PDF = "pdf",
    XLSX = "excel",
    ZIP = "zip",
}

export const exportFileHelper = (
    buffer: Buffer,
    filename: string,
    exportType: ExportType,
    res: Response,
) => {
    switch (exportType) {
        case ExportType.WORD: {
            res.setHeader(
                "Access-Control-Expose-Headers",
                "Content-Disposition",
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            );
            res.setHeader(
                "Content-Disposition",
                `filename="${encodeURIComponent(filename)}.docx"`,
            );
            break;
        }
        case ExportType.PDF: {
            res.setHeader(
                "Access-Control-Expose-Headers",
                "Content-Disposition",
            );
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `filename="${encodeURIComponent(filename)}.pdf"`,
            );
            break;
        }
        case ExportType.XLSX: {
            res.setHeader(
                "Access-Control-Expose-Headers",
                "Content-Disposition",
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );
            res.setHeader(
                "Content-Disposition",
                `filename="${encodeURIComponent(filename)}.xlsx"`,
            );
            break;
        }
        case ExportType.ZIP: {
            res.setHeader(
                "Access-Control-Expose-Headers",
                "Content-Disposition",
            );
            res.setHeader("Content-Type", "application/zip");
            res.setHeader(
                "Content-Disposition",
                `filename="${encodeURIComponent(filename)}.zip"`,
            );
            break;
        }
    }
    res.end(buffer);
};
