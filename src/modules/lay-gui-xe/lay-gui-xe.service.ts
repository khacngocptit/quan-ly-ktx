import { BadRequestException, Injectable } from "@nestjs/common";
import { DB_DANG_KY_VE_XE, DB_HOA_DON, DB_LAY_GUI_XE } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { LayGuiXeDocument } from "./lay-gui-xe.entity";
import { CreateLayGuiXeDto } from "./dto/create-lay-gui-xe.dto";
import { Mode } from "fs";
import { DangKyVeXeDocument } from "../dang-ky-ve-xe/dang-ky-ve-xe.entity";
import { HoaDon, HoaDonDocument } from "../hoa-don/hoa-don.entity";
import * as moment from "moment";
import { LoaiHoaDon, TrangThaiThanhToan } from "../hoa-don/common/hoa-don.constant";

@Injectable()
export class LayGuiXeService extends MongoRepository<LayGuiXeDocument> {
    constructor(
        @InjectModel(DB_LAY_GUI_XE)
        private readonly layGuiXeModel: Model<LayGuiXeDocument>,
        @InjectModel(DB_DANG_KY_VE_XE)
        private readonly dangKyVeXeModel: Model<DangKyVeXeDocument>,
        @InjectModel(DB_HOA_DON)
        private readonly hoaDonModel: Model<HoaDonDocument>

    ) {
        super(layGuiXeModel);
    }

    async create(doc: CreateLayGuiXeDto): Promise<LayGuiXeDocument> {
        const thongTinVeThang = await this.dangKyVeXeModel.find({
            idXe: doc.idXe,
            thang: doc.thang,
            nam: doc.nam,
        });

        if (thongTinVeThang) {
            const result = await this.layGuiXeModel.create(doc);
            const soLanGuiXeTrongNgay = await this.layGuiXeModel.find({
                idXe: doc.idXe,
                ngay: doc.ngay,
                thang: doc.thang,
                nam: doc.nam,
            });

            if (soLanGuiXeTrongNgay.length > 2) {
                const hoaDon: Partial<HoaDon> = {
                    donGia: 3000,
                    idSinhVien: result.idSinhVien,
                    idSource: String(result._id),
                    loaiHoaDon: LoaiHoaDon.GUI_XE,
                    soLuong: 1,
                    thanhTien: 3000,
                    trangThaiThanhToan: TrangThaiThanhToan.CHUA_THANH_TOAN,
                    thang: result.thang,
                    nam: result.nam,
                };
                await this.hoaDonModel.create(hoaDon);
            }
            return result;
        }
        else {
            throw new BadRequestException("Xe không đăng ký vé tháng này");
        }
    }
}

