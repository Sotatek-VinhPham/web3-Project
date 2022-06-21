import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/database/entities/users.entity";
import { UserController } from "./user.controller";
import { UserRep } from "./user.repository";
import { UserSchedule } from "./user.schedule";
import { UserService } from "./user.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([UserRep]),
        ScheduleModule.forRoot()],
    controllers: [UserController],
    providers : [UserService,UserSchedule]
})

export class UserModule {}