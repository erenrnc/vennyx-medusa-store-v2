import { defineRouteConfig } from "@medusajs/admin-sdk"
//import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading } from "@medusajs/ui"

const CustomPage = () => {
    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">This is my custom route</Heading>
            </div>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Pokemons",
    //icon: ChatBubbleLeftRight,
})

export default CustomPage

//import { defineRouteConfig } from "@medusajs/admin-sdk"

//const CustomPage = () => {
//    return (
//            <div>
//                some ui
//            </div>
//    )
//}

//export const config = defineRouteConfig({
//    label: "Pokemons",
//})

//export default CustomPage;

//import { Container, Heading } from "@medusajs/ui"

//const CustomPage = () => {
//    return (
//        <Container className="divide-y p-0">
//            <div className="flex items-center justify-between px-6 py-4">
//                <Heading level="h2">This is my custom route</Heading>
//            </div>
//        </Container>
//    )
//}

//export default CustomPage