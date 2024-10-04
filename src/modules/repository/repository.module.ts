import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DeviceDataSchema } from "../device-data/entities/device-data.entity";
import { DichVuKtxSchema } from "../dich-vu-ktx/dich-vu-ktx.entity";
import { FileManagerProvider } from "../file-manager/entities/file-manager.entity";
import { KhachVaoRaKtxSchema } from "../khach-vao-ra-ktx/khach-vao-ra-ktx.entity";
import { JoinTopicSchema } from "../notification/entities/join-topic.entity";
import { NotificationSchema } from "../notification/entities/notification.entity";
import { NotifyReadSchema } from "../notification/entities/notify-read.entity";
import { TopicSchema } from "../notification/entities/topic/topic.entity";
import { PhongKtxSchema } from "../phong-ktx/phong-ktx.entity";
import { SettingSchema } from "../setting/entities/setting.entity";
import { UserSchema } from "../user/entities/user.entity";
import * as db from "./db-collection";
import { QuanLyXeSchema } from "../quan-ly-xe/quan-ly-xe.entity";
import { DangKyPhongSchema } from "../dang-ky-phong/dang-ky-phong.entity";
import { DangKyVeXeSchema } from "../dang-ky-ve-xe/dang-ky-ve-xe.entity";
import { DangKySuDungDichVuSchema } from "../dang-ky-su-dung-dich-vu/dang-ky-su-dung-dich-vu.entity";
import { LayGuiXeSchema } from "../lay-gui-xe/lay-gui-xe.entity";
import { HoaDonSchema } from "../hoa-don/hoa-don.entity";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: db.DB_SETTING, schema: SettingSchema },
            { name: db.DB_USER, schema: UserSchema },
            // { name: db.DB_PROFILE, schema: ProfileSchema },
            { name: db.DB_DEVICE_DATA, schema: DeviceDataSchema },
            { name: db.DB_NOTIFICATION, schema: NotificationSchema },
            { name: db.DB_TOPIC, schema: TopicSchema },
            { name: db.DB_JOIN_TOPIC, schema: JoinTopicSchema },
            { name: db.DB_NOTIFY_READ, schema: NotifyReadSchema },
            { name: db.DB_PHONG, schema: PhongKtxSchema },
            { name: db.DB_KHACH_VAO_RA_KTX, schema: KhachVaoRaKtxSchema },
            { name: db.DB_DICH_VU_KTX, schema: DichVuKtxSchema },
            { name: db.DB_QUAN_LY_XE, schema: QuanLyXeSchema },
            { name: db.DB_DANG_KY_THUE_PHONG, schema: DangKyPhongSchema },
            { name: db.DB_DANG_KY_VE_XE, schema: DangKyVeXeSchema },
            { name: db.DB_DANG_KY_DICH_VU, schema: DangKySuDungDichVuSchema },
            { name: db.DB_DANG_KY_THUE_PHONG, schema: DangKyPhongSchema },
            { name: db.DB_DANG_KY_VE_XE, schema: DangKyVeXeSchema },
            { name: db.DB_LAY_GUI_XE, schema: LayGuiXeSchema },
            { name: db.DB_HOA_DON, schema: HoaDonSchema },
        ]),
    ],
    providers: [FileManagerProvider],
    exports: [FileManagerProvider, MongooseModule],
})
export class RepositoryModule {}
