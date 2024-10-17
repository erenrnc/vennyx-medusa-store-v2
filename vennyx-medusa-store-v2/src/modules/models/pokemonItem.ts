////import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
//////const { Entity, Column, PrimaryGeneratedColumn } = require("typeorm");

////@Entity()
////class Pokeitem {
////    @PrimaryGeneratedColumn()
////    id;

////    @Column({ type: "varchar" })
////    name;

////    @Column({ type: "varchar" })
////    img;

////    @Column({ type: "varchar" })
////    type;
////}

////export default Pokeitem

//const { EntitySchema } = require("typeorm");

//const Pokeitem = new EntitySchema({
//    name: "Pokeitem",
//    tableName: "pokeitems",
//    columns: {
//        id: {
//            type: "int",
//            primary: true,
//            generated: true,
//        },
//        name: {
//            type: "varchar",
//        },
//        img: {
//            type: "varchar",
//        },
//        type: {
//            type: "varchar",
//        }
//    }
//});

//module.exports = Pokeitem;

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Pokeitem {
    @PrimaryKey()
    id: number;

    @Property({ type: "varchar" })
    name: string;

    @Property({ type: "varchar" })
    img: string;

    @Property({ type: "varchar" })
    type: string;
}

export default Pokeitem;


//import { model } from '@medusajs/framework/utils'

//const Pokeitem = model.define("Pokeitem", {
//    id: model.id().primaryKey(),
//    name: model.text(),
//    img: model.text(),
//    type: model.text()
//});
//export default Pokeitem;
