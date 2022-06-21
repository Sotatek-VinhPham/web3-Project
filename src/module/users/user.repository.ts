import { Injectable } from "@nestjs/common";
import { Users } from "src/database/entities/users.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Users)

export class UserRep extends Repository<Users> {}