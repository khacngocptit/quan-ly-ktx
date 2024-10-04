import { Injectable, NotFoundException } from "@nestjs/common";
import { DB_DANG_KY_DICH_VU, DB_DICH_VU_KTX, DB_HOA_DON, DB_USER } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKySuDungDichVuDocument } from "./dang-ky-su-dung-dich-vu.entity";
import { DichVuKtx, DichVuKtxDocument } from "../dich-vu-ktx/dich-vu-ktx.entity";
import { HoaDon, HoaDonDocument } from "../hoa-don/hoa-don.entity";
import { CreateDangKySuDungDichVuDto } from "./dto/create-dang-ky-su-dung-dich-vudto";
import { LoaiHoaDon, TrangThaiThanhToan } from "../hoa-don/common/hoa-don.constant";

@Injectable()
export class DangKySuDungDichVuService extends MongoRepository<DangKySuDungDichVuDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_DICH_VU)
        private readonly dangKyDichVuModel: Model<DangKySuDungDichVuDocument>,
        @InjectModel(DB_HOA_DON)
        private readonly hoaDonModel: Model<HoaDonDocument>,
        @InjectModel(DB_DICH_VU_KTX)
        private readonly dichVuKtxModel: Model<DichVuKtxDocument>
    ) {
        super(dangKyDichVuModel);
    }

    async create(doc: CreateDangKySuDungDichVuDto): Promise<DangKySuDungDichVuDocument> {
        const dichVu = await this.dichVuKtxModel.findById(doc.idDichVu);
        if (!dichVu) {
            throw new NotFoundException("Không có thông tin dịch vụ đăng ký");
        }
        const result = await this.dangKyDichVuModel.create({
            ...doc,
            donGia: dichVu.donGia,
        });
        const hoaDon: Partial<HoaDon> = {
            donGia: dichVu.donGia,
            idSinhVien: result.idSinhVien,
            idSource: String(result._id),
            loaiHoaDon: LoaiHoaDon.DICH_VU,
            soLuong: 1,
            thang: result.thang,
            nam: result.nam,
            thanhTien: dichVu.donGia * 1,
            trangThaiThanhToan: TrangThaiThanhToan.CHUA_THANH_TOAN,
        };

        await this.hoaDonModel.create(hoaDon);
        return result;
    }

    async thongKeSuDungDichVu(
        startDate: string,
        endDate: string
    ) {
        const data = await this.dangKyDichVuModel.aggregate([
            {
                $lookup: {
                    from: DB_USER,
                    localField: "idSinhVien",
                    foreignField: "_id",
                    as: "sinhVien",
                },
            },
            {
                $lookup: {
                    from: DB_DICH_VU_KTX,
                    localField: "idDichVu",
                    foreignField: "_id",
                    as: "dichVu",
                },
            },
            {
                $match: {
                    thoiGianBatDauSuDung: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        idSinhVien: "$idSinhVien",
                        idDichVu: "$idDichVu",
                    },
                    tongTien: { $sum: "$donGia" },
                    sinhVienInfo: { $first: "$sinhVien" },
                    dichVuInfo: { $first: "$dichVu" },
                },
            },

        ]);
        return data;
    }

    async thongKeDichVu(

    ) {
        const result = await this.dangKyDichVuModel.aggregate([
            {
                $lookup: {
                    from: DB_DICH_VU_KTX,
                    localField: "idDichVu",
                    foreignField: "_id",
                    as: "dichVu",
                },
            },
            {
                $group: {
                    _id: {
                        idDichVu: "$idDichVu",
                        month: "$thang",
                        year: "$nam",
                    },
                    tongDoanhThu: { $sum: "$donGia" },
                    tenDichVu: { $first: "$dichVu.ten" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);
        return result;
    }
}
