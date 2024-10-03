import { Injectable } from "@nestjs/common";
import { DB_HOA_DON, DB_USER } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { HoaDonDocument } from "./hoa-don.entity";
import { LoaiHoaDon } from "./common/hoa-don.constant";
import { NextFunction, Response } from "express";
import * as moment from "moment";
import * as xlsx from "xlsx";
import { exportFileHelper, ExportType } from "src/config/constant";

@Injectable()
export class HoaDonService extends MongoRepository<HoaDonDocument> {
    constructor(
        @InjectModel(DB_HOA_DON)
        private readonly hoaDonModel: Model<HoaDonDocument>
    ) {
        super(hoaDonModel);
    }

    async thongKeThongTinHoaDonSinhVienMoiThang(
        thang: number,
        nam: number
    ) {
        const data = await this.hoaDonModel.aggregate([
            {
                $match: {
                    thang,
                    nam,
                },
            },
            {
                $group: {
                    _id: {
                        idSinhVien: "$idSinhVien",
                        loaiHoaDon: "$loaiHoaDon",
                    },
                    total: { $sum: "$thanhTien" },
                    idSinhVien: { $first: "idSinhVien" },
                    loaiHoaDon: { $first: "loaiHoaDon" },
                },
            },
            {
                $lookup: {
                    from: DB_USER,
                    localField: "idSinhVien",
                    foreignField: "_id",
                    as: "sinhVien",
                },
            },
        ]);

        const result = data.reduce((pre, curr) => {
            if (!pre[curr._id.idSinhVien]) {
                pre[curr._id.idSinhVien] = {
                    dichVu: 0,
                    thuePhong: 0,
                    veXe: 0,
                    guiXe: 0,
                    sinhVien: curr.sinhVien,
                };
            }
            switch (curr.loaiHoaDon) {
                case LoaiHoaDon.DICH_VU: {
                    pre[curr._id.idSinhVien].dichVu = Number(curr?.total || 0);
                    break;
                }
                case LoaiHoaDon.GUI_XE: {
                    pre[curr._id.idSinhVien].guiXe = Number(curr?.total || 0);
                    break;
                }
                case LoaiHoaDon.THUE_PHONG: {
                    pre[curr._id.idSinhVien].thuePhong = Number(curr?.total || 0);
                    break;
                }
                case LoaiHoaDon.VE_XE: {
                    pre[curr._id.idSinhVien].veXe = Number(curr?.total || 0);
                    break;
                }
            }
            return pre;
        }, {});
        return Object.values(result);
    }

    async exportThongTinHoaDon(thang: number, nam: number, res: Response, next: NextFunction) {
        try {
            const data: any[] = await this.thongKeThongTinHoaDonSinhVienMoiThang(thang, nam,);
            const dataJson = data.map((e, i) => {
                return {
                    "STT": i + 1,
                    "Họ đệm": e.sinhVien.hoDem,
                    "Tên": e.sinhVien.ten,
                    "Số CMND": e.sinhVien.soCMND,
                    "Ngày sinh": moment(e.sinhVien.ngaySinh).format("DD/MM/YYYY"),
                    "Lớp": e.sinhVien.lop,
                    "Quê quán": e.sinhVien.queQuan,
                    "Dịch vụ": e?.dichVu || 0,
                    "Thuê phòng": e?.thuePhong || 0,
                    "Vé xe": e?.veXe || 0,
                    "Gửi xe": e?.guiXe || 0,
                };
            });
            const workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.json_to_sheet(dataJson);
            xlsx.utils.book_append_sheet(workbook, worksheet);
            const buffer = await xlsx.write(workbook, { type: "buffer" });
            exportFileHelper(buffer, "file-export.xlsx", ExportType.XLSX, res);
        } catch (error) {
            next(error);
        }

    }
}

