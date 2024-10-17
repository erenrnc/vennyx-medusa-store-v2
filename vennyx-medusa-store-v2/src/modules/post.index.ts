import PostModuleService from "./post/service"
import { Module } from "@medusajs/framework/utils"
import { EntityManager } from "@mikro-orm/core";

export default Module("postModuleService", {
    service: PostModuleService,
})