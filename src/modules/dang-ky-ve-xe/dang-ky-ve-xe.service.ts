import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { DB_DANG_KY_VE_XE, DB_HOA_DON } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKyVeXeDocument } from "./dang-ky-ve-xe.entity";
import { CreateDangKyVeXeDto } from "./dto/create-dang-ky-ve-xe.dto";
import { HoaDon, HoaDonDocument } from "../hoa-don/hoa-don.entity";
import { LoaiHoaDon, TrangThaiThanhToan } from "../hoa-don/common/hoa-don.constant";

@Injectable()
export class DangKyVeXeService extends MongoRepository<DangKyVeXeDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_VE_XE)
        private readonly dangKyVeXeModel: Model<DangKyVeXeDocument>,
        @InjectModel(DB_HOA_DON)
        private readonly hoaDonModel: Model<HoaDonDocument>
    ) {
        super(dangKyVeXeModel);
    }

    async create(doc: CreateDangKyVeXeDto): Promise<DangKyVeXeDocument> {
        const checkExist = await this.dangKyVeXeModel.exists({
            thang: doc.thang,
            nam: doc.nam,
            idXe: doc.idXe,
        });
        if (checkExist) {
            throw new ConflictException("Xe đã được đăng ký vé tháng này");
        }
        const checkDaDangKy = await this.dangKyVeXeModel.find({
            thang: doc.thang,
            nam: doc.nam,
            idSinhVien: doc.idSinhVien,
        });

        if (checkDaDangKy && checkDaDangKy.length >= 2) {
            throw new BadRequestException("Tháng này đã đăng ký đủ vé xe tối đa");
        }

        const result = await this.dangKyVeXeModel.create(doc);
        const hoaDon: Partial<HoaDon> = {
            donGia: 100000,
            idSinhVien: result.idSinhVien,
            idSource: String(result._id),
            loaiHoaDon: LoaiHoaDon.VE_XE,
            soLuong: 1,
            thang: result.thang,
            nam: result.nam,
            thanhTien: 100000,
            trangThaiThanhToan: TrangThaiThanhToan.CHUA_THANH_TOAN,
        };
        await this.hoaDonModel.create(hoaDon);
        return result;

    }
}

