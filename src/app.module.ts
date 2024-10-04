import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpExceptionFilter } from "./common/exception/http-exception.filter";
import { TransformResponseInterceptor } from "./common/pipe/transform-response.intercepter";
import configuration from "./config/configuration";
import { MongooseConfigService } from "./config/mongodb-config.service";
import { AuthModule } from "./modules/auth/auth.module";
import { DangKyPhongModule } from "./modules/dang-ky-phong/dang-ky-phong.module";
import { DangKySuDungDichVuModule } from "./modules/dang-ky-su-dung-dich-vu/dang-ky-su-dung-dich-vu.module";
import { DangKyVeXeModule } from "./modules/dang-ky-ve-xe/dang-ky-ve-xe.module";
import { DeviceDataModule } from "./modules/device-data/device-data.module";
import { DichVuKtxModule } from "./modules/dich-vu-ktx/dich-vu-ktx.module";
import { FileManagerModule } from "./modules/file-manager/module/file-manager.module";
import { HoaDonModule } from "./modules/hoa-don/hoa-don.module";
import { KhachVaoRaKtxModule } from "./modules/khach-vao-ra-ktx/khach-vao-ra-ktx.module";
import { LayGuiXeModule } from "./modules/lay-gui-xe/lay-gui-xe.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { OneSignalModule } from "./modules/one-signal/one-signal.module";
import { PhongKtxModule } from "./modules/phong-ktx/phong-ktx.module";
import { QuanLyXeModule } from "./modules/quan-ly-xe/quan-ly-xe.module";
import { RepositoryModule } from "./modules/repository/repository.module";
import { SettingModule } from "./modules/setting/setting.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
            inject: [ConfigService],
        }),
        RepositoryModule,
        AuthModule,
        SettingModule,
        UserModule,
        // ProfileModule,
        SettingModule,
        FileManagerModule,
        DeviceDataModule,
        NotificationModule,
        OneSignalModule,
        PhongKtxModule,
        KhachVaoRaKtxModule,
        HoaDonModule,
        DichVuKtxModule,

        QuanLyXeModule,
        DangKyPhongModule,
        DangKyVeXeModule,
        DangKySuDungDichVuModule,
        LayGuiXeModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },

    ],
})
export class AppModule {}
