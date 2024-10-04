import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DB_DANG_KY_THUE_PHONG, DB_HOA_DON, DB_PHONG } from "../repository/db-collection";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKyPhongDocument } from "./dang-ky-phong.entity";
import { CreateDangKyPhongDto } from "./dto/create-dang-ky-phong.dto";
import { PhongKtxDocument } from "../phong-ktx/phong-ktx.entity";
import * as moment from "moment";
import { HoaDon, HoaDonDocument } from "../hoa-don/hoa-don.entity";
import { LoaiHoaDon, TrangThaiThanhToan } from "../hoa-don/common/hoa-don.constant";

@Injectable()
export class DangKyPhongService extends MongoRepository<DangKyPhongDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_THUE_PHONG)
        private readonly dangKyPhongModel: Model<DangKyPhongDocument>,
        @InjectModel(DB_PHONG)
        private readonly phongModel: Model<PhongKtxDocument>,
        @InjectModel(DB_HOA_DON)
        private readonly hoaDonModel: Model<HoaDonDocument>
    ) {
        super(dangKyPhongModel);
    }

    async create(doc: CreateDangKyPhongDto): Promise<DangKyPhongDocument> {
        const daDangKy = await this.dangKyPhongModel.exists({
            idSinhVien: doc.idSinhVien,
            thang: doc.thang,
            nam: doc.nam,
        });
        if (daDangKy) {
            throw new ConflictException("Sinh viên đã đăng ký phòng tháng này");
        }
        const phong = await this.phongModel.findById(doc.idPhong);
        if (!phong) {
            throw new NotFoundException("Không có thông tin phòng đăng ký");
        }

        const checkFullPhong = await this.dangKyPhongModel.find({
            thang: doc.thang,
            nam: doc.nam,
            idPhong: doc.idPhong,
        });

        if (checkFullPhong.length === phong.soNguoiToiDa) {
            throw new BadRequestException("Phòng đã đạt số lượng tối đa");
        }
        const result = await this.dangKyPhongModel.create(doc);
        const hoaDon: Partial<HoaDon> = {
            donGia: phong.donGia,
            idSinhVien: result.idSinhVien,
            idSource: String(result._id),
            loaiHoaDon: LoaiHoaDon.THUE_PHONG,
            soLuong: 1,
            thanhTien: phong.donGia * 1,
            trangThaiThanhToan: TrangThaiThanhToan.CHUA_THANH_TOAN,
            thang: result.thang,
            nam: result.nam,
        };

        await this.hoaDonModel.create(hoaDon);
        return result;
    }
}

