import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../repository/mongo-repository";
import { KhachVaoRaKtxDocument } from "./khach-vao-ra-ktx.entity";
import { DB_KHACH_VAO_RA_KTX, DB_USER } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KhachVaoRaKtxConditionDto } from "./dto/khach-vao-ra-ktx-condition.dto";

@Injectable()
export class KhachVaoRaKtxService extends MongoRepository<KhachVaoRaKtxDocument> {
    constructor(
        @InjectModel(DB_KHACH_VAO_RA_KTX)
        private readonly khachVaoRaKtxModel: Model<KhachVaoRaKtxDocument>
    ) {
        super(khachVaoRaKtxModel);
    }

    async getMany(condition: KhachVaoRaKtxConditionDto) {
        return this.khachVaoRaKtxModel.find(condition).populate("idSinhVien");
    }

    async thongKeKhachDenKtx(
        ngayBatDau: string,
        ngayKetThuc: string

    ) {
        const data = await this.khachVaoRaKtxModel.aggregate([
            {
                $lookup: {
                    from: DB_USER,
                    localField: "idSinhVien",
                    foreignField: "_id",
                    as: "sinhVien",
                },
            },
            {
                $match: {
                    ngayDen: {
                        $gte: ngayBatDau,
                        $lte: ngayKetThuc,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        idSinhVien: "$idSinhVien",
                        cmtCccd: "$cmtCccd",
                    },
                    hoTenKhach: { $first: "$hoTen" },
                    ngaySinhKhach: { $first: "$ngaySinh" },
                    soLanDen: { $sum: 1 },
                    sinhVienInfo: { $first: "$sinhVien" },
                },
            },
        ]);

        const result = data.reduce((pre, curr) => {
            if (!pre[curr._id.idSinhVien]) {
                pre[curr._id.idSinhVien] = {
                    thongTinSinhVien: curr.sinhVienInfo,
                    danhSachKhach: [],
                };
                pre[curr._id.idSinhVien].danhSachKhach.push({
                    hoDen: curr.hoTenKhach,
                    cmtCccd: curr._id.cmtCccd,
                    ngaySinh: curr.ngaySinhKhach,
                    soLanDen: curr.soLanDen,
                });
            }
            return pre;
        }, {});

        return result;
    }
}
