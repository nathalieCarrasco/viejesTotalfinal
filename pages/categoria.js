import Layout from "@/components/Layaut";
import CategoriaManager from "@/components/categoria/manager";

export default function PaginaCategoria(){
    return(
        <Layout>
         <h1 className="titulo">Categoria</h1>
        <CategoriaManager></CategoriaManager>
        </Layout>
    )
}