import { BlogCreateBodyType, BlogResType } from "../schemaValidations/blog.schema"
import http from "../untils/http"

const blogApiRequest ={
    createBlog:(body: BlogCreateBodyType) =>
        http.post<BlogResType>("blog/create",body,),
}


export default blogApiRequest