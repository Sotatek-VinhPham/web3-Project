import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { UserService } from "./user.service";

@Injectable()
export class UserSchedule {
    constructor(private readonly userService : UserService) {}

    @Interval(360000000)
    handleInterval() {
        return this.userService.schedule()
    }
}