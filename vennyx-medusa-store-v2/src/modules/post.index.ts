import PostModuleService from "./post/service"
import { Module } from "@medusajs/framework/utils"

export default Module("postModuleService", {
    service: PostModuleService,
})